---
layout: page
title: Echo
description: a sequentially consistent replicated key-value store.
img:
importance: 3
category: fun
---

Replicated Key-Value stores are key components in the internet-scale systems. Scalability (scales up with demand), Reliability (tolerant to node failures), and Performance (serve requests in parallel) are the most important reasons for replicating and distributing the data across multiple servers and data centers.


### API

The API is kept simple with only two functions.

1. GET(key): retrieves the value corresponding to the given key from the currently connected replica. The system is expected to provide the stale value until the latest commit is propagated to the connected replica. 
2. PUT(key,value): puts the value with the given key in the data store. In the current instance, a replica (server) can sent at most one write request in its request queue.

### Architecture

The following assumptions are made in the design of the system.
1. Most of the client requests are read heavy. Concurrent write requests are rare.
2. `Value`'s size for any `key` is at most 1024 bytes. This limitation is based on the max allowable buffer size in the Java. There's a trivial solution for this limitation, but not included in the design for simplicity.
3. When rejoining, a server joins as a new replica. 
Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
4. No partitions and jitter in the network to avoid split brain.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/echo_request.png" title="API workflow" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The core architecture of the system consists of the following subsystems (refer to picture above).

#### Leader

The _leader_ orders every write request in the data store. When a leader receives a write request from the replica, it assigns a unique number to it and performs its commit. Since all the requests are added to the queue, there exists a valid sequence to order the requests. The leader uses two threads to commit a transaction (one to listen to write requests from the replicas and one to start the commit protocol).


#### Server
The _server_ (replica) receives requests from the clients. If the request is of type `get`, then the replica will serve the request from its local datastore. If the request is of type `put`, it sends the request to the leader to commit the write to all the other replicas in the same order. The replica is a three-threaded program that maintains a server to handle connections from clients and a socket to connect to the leader.


### Implementation
The entire project is built completely with Java SE 17 from scratch with only using _Zookeeper_ library to track the status of active nodes and an Apache Lang library to serialize/deserialize the Data Transfer Objects (DTO). 

#### Node communication.

All the communication protocols are built from scratch using Java NIO Channels and buffers for multiplexing the performance of I/O operations. A server socket creates a _channel_ and registers all the connected clients with a _selector_ to server multiple clients based on their readiness with only using a single thread. More than 2000 lines of Java code is written for this project.

#### Commit protocol

A modified version of 1-phase commit protocol is designed for this system.

1. Master/leader sends commit requests to all the replicas.
2. Replicas send an `ACKNOWLEDGEMENT` to the leader and commit the request to their local data store.
3. When leader fails during commit in progress, all the replicas participate in the leader election and the newly elected leader will collect all the replica's latest commit they received.
4. New leader commits the pending commit.
5. Leader then accepts the write requests from the replicas.
6. Anytime the difference between the commitID between all the active replicas is at most 1 (exists a trivial proof).


#### Leader Election
New leader election protocol is proposed that uses Zookeeper.

1. **Phase 0**. Current leader crashes. Zookeeper notifies the replicas about the leader crash. All the replicas participate in the leader election.
2. **Phase 1** The idea is to select the replica which received latest commit from the previous leader. Ties are broken with by selecting the fastest responding node. There exists a shared memory named `Latest` provided by the zookeeper. The replica will write its latest value only if the current `latest`'s value is less than its latest commit value. If so, it will sleep for a specified timeout to let the other nodes complete their phase 1.
```c++
if (server.commitId > Commit.value) {
    Commit.value = (server.commitID, server.ID);
    server.status = WAIT;
    sleep(server);
}
else server.status = LOST;
```

3. **Phase 2** After the timeout, all the waiting nodes recheck the `latest` value and compares it with its own value. All the lost nodes in Phase 1 will exit from the election. The winner of the Phase 2 will create the `leader` node in zookeeper.
```c++
if (server.status == WAIT && server.commitID == Commit.value)
    server.status = LEADER;
else server.status = LOST;
```

Then zookeeper will notify all the replicas about the new leader, and all replicas will get the address of current leader.


### Usage
Source code for this project is available [here](https://github.com/var-nan/Echo/)

Before starting the program, it is necessary to start the zookeeper server as a separate process, run the `Setup.java` script to initialize all the required `znodes`, and run the `Central` program as a seperate process. 

The user can join the system as a `Replica`( by running the `Service.java` file) or as a `Client` (by running the `TestClient.java` file) that sends data requests to the `Replica`. The `Client` is expected to get the replica address by contacting the `Central`.


### Note

We kept our API as simple as possible to give the users a standard interface like a regular data store. The decision to make the *write* requests to process only through the leader is intentional, to provide Sequential Consistency. Our datastore is sequentially consistent if the network guarantees that there are no partitions and jitters in the network. 

Most of the design decisions are finalized after considering most of the alternative design models and implementation difficulties. We want to build this project with realistic assumptions.

In addition, we modified the 1-phase commit protocol to integrate with our architecture. This decision is to make the I/O channels transfer as little data as possible to commit a transaction.
