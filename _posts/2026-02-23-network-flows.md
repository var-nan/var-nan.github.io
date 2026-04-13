---
layout: post
title: Flow Networks
date: 2026-03-23 16:00:00
description: Finding a flow to push through a network given some constraints.
tags: graph optimization
categories: Graphs
featured: true
tikzjax: true
mermaid:
    enabled: true
    zoomable: true
header-includes:
    - \usepackage{tikz}
---


A flow network $G = (V,E)$ is a directed graph with set of vertices $V$ and set of edges $E$, where each edge $e \in E$ has a nonnegative capacity $c (e) \geq 0$. There are two distinguished vertices in this network: a *source* $s$ and a *sink* $t$ that behave slightly different as we see in a moment. A source vertex has no incoming flow and a sink vertex has no outgoing flow.  Below is an example of such a flow network. The numbers on the edges are the capacities of these edges.

<script type="text/tikz">
\begin{document}
\usetikzlibrary{automata, positioning}
\tikzset{vertex/.style={draw, circle, minimum size=0.75cm, node distance=3cm, >=stealth, fill=violet!20}}
\tikzset{source/.style={fill=green!20}}
\tikzset{sink/.style={fill=yellow!20}}
\tikzset{saturated/.style={opacity=0.3}}
\begin{tikzpicture}
    \node[vertex, source] (s) {$s$};
    \node[vertex, above right of=s] (a) {$a$};
    \node[vertex, below right of=s] (b) {$b$};
    \node[vertex, right of=a] (c) {$c$};
    \node[vertex, right of=b] (d) {$d$};
    \node[vertex, sink, above right of=d] (t) {$t$};

    \path[->] (a) edge[above] node {2} (c);
    \path[->] (c) edge[above] node {3} (t) edge[above] node {1} (b);
    \path[->] (s) edge[above] node {3} (a) edge[below] node {2} (b);
    \path[->] (b) edge[below] node {3} (d) edge [left] node {1} (a);
    \path[->] (d) edge[below] node {2} (t) edge[left] node {3} (c);
\end{tikzpicture}
\end{document}
</script>

<br>

For simplicity, we assume that there are no self-loops, anti-parallel and parallel edges in the network, though they can be easily resolved and doesn't affect the final solution.

{% details click here to know how to resolve them %}
We can transform the given graph and introduce dummy nodes to handle remove loops, parallel and anti-parallel edges.
{% enddetails %}

<br>

We define a flow $f$ is a function $f : V \times V \rightarrow R$ that satisfies the following properties.

* Capacity Constraint : 

$$ 0 \leq f(u,v) \leq c(u,v) \quad \forall u,v \in V$$

* Flow Conservation: total incoming flow at a vertex should be equal to the total outgoing flow, except for $s$ and $t$.

$$ \sum_{u\in V} f(u,v) = \sum_{u \in V} f(v,u) \quad \forall u,v \in V \setminus \{s,t\} $$ 

The value $\|.\|$ of a flow $f$ is defined as 

$$ |f| = \sum_{v\in V} f(s,v) - \sum_{v\in V} f(v,s) $$


Given this, the goal of the maximum flow problem is to find a flow of maximum value satisfying the above two constraints. 


A simple way to find the max flow is to iteratively find an $s - t$ path and push flow as long as an edge can accept additional flow. 

For the above example, we can find a path $s \rightarrow b \rightarrow a \rightarrow c \rightarrow t$ and push 1 unit of flow, because the minimum capacity is 1 among the edges in this path. The network is updated as below.

<script type="text/tikz">
\begin{document}
\usetikzlibrary{automata, positioning}
\tikzset{vertex/.style={draw, circle, minimum size=0.75cm, node distance=3cm, >=stealth, fill=violet!20}}
\tikzset{source/.style={fill=green!20}}
\tikzset{sink/.style={fill=yellow!20}}
\tikzset{saturated/.style={opacity=0.3}}
\begin{tikzpicture}
    \node[vertex, source] (s) {$s$};
    \node[vertex, above right of=s] (a) {$a$};
    \node[vertex, below right of=s] (b) {$b$};
    \node[vertex, right of=a] (c) {$c$};
    \node[vertex, right of=b] (d) {$d$};
    \node[vertex, sink, above right of=d] (t) {$t$};

    \path[->] (a) edge[above] node {1:2} (c);
    \path[->] (c) edge[above] node[sloped] {1:3} (t) edge[above] node {1} (b);
    \path[->] (s) edge[above] node {3} (a) edge[below] node[sloped] {1:2} (b);
    \path[->] (b) edge[below] node {3} (d) edge [left] node {1:1} (a);
    \path[->] (d) edge[below] node[sloped] {2} (t) edge[left] node {3} (c);
    \draw[red, line width=4pt, opacity=0.4] (s) -- (b) -- (a) -- (c) -- (t);
\end{tikzpicture}
\end{document}
</script>

In the next iteration, we can find a path $s \rightarrow a \rightarrow c \rightarrow t$ and push one more unit of flow. Now the edge $a-c$ is at full capacity and cannot accept anymore flow through it. 

<script type="text/tikz">
\begin{document}
\usetikzlibrary{automata, positioning}
\tikzset{vertex/.style={draw, circle, minimum size=0.75cm, node distance=3cm, >=stealth, fill=violet!20}}
\tikzset{source/.style={fill=green!20}}
\tikzset{sink/.style={fill=yellow!20}}
\tikzset{saturated/.style={opacity=0.3}}
\begin{tikzpicture}
    \node[vertex, source] (s) {$s$};
    \node[vertex, above right of=s] (a) {$a$};
    \node[vertex, below right of=s] (b) {$b$};
    \node[vertex, right of=a] (c) {$c$};
    \node[vertex, right of=b] (d) {$d$};
    \node[vertex, sink, above right of=d] (t) {$t$};

    \path[->] (a) edge[above] node {2:2} (c);
    \path[->] (c) edge[above] node[sloped] {2:3} (t)
        edge[above] node {1} (b);
    \path[->] (s) edge[above] node[sloped] {1:3} (a) edge[below] node[sloped] {1:2} (b);
    \path[->] (b) edge[below] node {3} (d)
    edge [left] node {1:1} (a);
    \path[->] (d) edge[below] node[sloped] {2} (t) 
        edge[left] node {3} (c);
    \draw[red, line width=4pt, opacity=0.4] (s) -- (a) -- (c) -- (t);
\end{tikzpicture}
\end{document}
</script>

Next, one more unit of flow $s \rightarrow b \rightarrow d \rightarrow t$ can be pushed. At this point, three edges $s - b$, $a-c$ and $b-a$ are at full capacity. The current flow value is 3.

<script type="text/tikz">
\begin{document}
\usetikzlibrary{automata, positioning}
\tikzset{vertex/.style={draw, circle, minimum size=0.75cm, node distance=3cm, >=stealth, fill=violet!20}}
\tikzset{source/.style={fill=green!20}}
\tikzset{sink/.style={fill=yellow!20}}
\tikzset{saturated/.style={opacity=0.3}}
\begin{tikzpicture}
    \node[vertex, source] (s) {$s$};
    \node[vertex, above right of=s] (a) {$a$};
    \node[vertex, below right of=s] (b) {$b$};
    \node[vertex, right of=a] (c) {$c$};
    \node[vertex, right of=b] (d) {$d$};
    \node[vertex, sink, above right of=d] (t) {$t$};

    \path[->] (a) edge[above] node {2:2} (c);
    \path[->] (c) edge[above] node[sloped] {2:3} (t)
        edge[above] node {1} (b);
    \path[->] (s) edge[above] node[sloped] {1:3} (a) edge[below] node[sloped] {2:2} (b);
    \path[->] (b) edge[below] node {1:3} (d)
    edge [left] node {1:1} (a);
    \path[->] (d) edge[below] node[sloped] {1:2} (t) 
        edge[left] node {3} (c);
    \draw[red, line width=4pt, opacity=0.4] (s) -- (b) -- (d) -- (t);
\end{tikzpicture}
\end{document}
</script>

Now, it looks like we cannot send anymore flow. If we observe carefully, if we divert all the incoming flow at $b$ to $d$, we can push one more unit of flow from $s \rightarrow a \rightarrow c \rightarrow t$. This would increase the total flow to 4.

<script type="text/tikz">
\begin{document}
\usetikzlibrary{automata, positioning}
\tikzset{vertex/.style={draw, circle, minimum size=0.75cm, node distance=3cm, >=stealth, fill=violet!20}}
\tikzset{source/.style={fill=green!20}}
\tikzset{sink/.style={fill=yellow!20}}
\tikzset{saturated/.style={opacity=0.3}}
\begin{tikzpicture}
    \node[vertex, source] (s) {$s$};
    \node[vertex, above right of=s] (a) {$a$};
    \node[vertex, below right of=s] (b) {$b$};
    \node[vertex, right of=a] (c) {$c$};
    \node[vertex, right of=b] (d) {$d$};
    \node[vertex, sink, above right of=d] (t) {$t$};

    \path[->] (a) edge[above] node {2:2} (c);
    \path[->] (c) edge[above] node[sloped] {2:3} (t) edge[above] node {1} (b);
    \path[->] (s) edge[above] node[sloped] {2:3} (a) edge[below] node[sloped] {2:2} (b);
    \path[->] (b) edge[below] node {2:3} (d) edge [left] node {1} (a);
    \path[->] (d) edge[below] node[sloped] {2:2} (t) edge[left] node {3} (c);
    \draw[red, line width=4pt, opacity=0.4] (s) -- (a) -- (c) -- (t);
    \draw[red, line width=4pt, opacity=0.4] (s) -- (b) -- (d) -- (t);
\end{tikzpicture}
\end{document}
</script>

We need a mechanism to _undo_ (or _cancel_) a flow through an edge and divert it to other edge. So, how to do it? We need to leave some marker points on how to _undo_ flow that's going through an edge. Using this marker, we can cancel a flow coming through it. 


#### Residual Network
Given a flow network $G$, and a flow $f$, the *residual network* $G_f$ consists of edges whose capacities represent how the flow can change on edges of $G$. An edge of $G$ can admit more flow if its capacity is greater than its current flow. We call the current capacity as *residual capacity* $c_f (u,v) = c(u,v) - f(u,v)$. Only the edges with $c_f > 0$ are present in $G_f$. In addition, if there is a $x$ units of flow in an edge $(u,v) \in E$, then there will be a reverse edge $(v,u) \in E_f$ with capacity $f(u,v)$.

Lets formalize this mathematically. Given a flow $f$, the *residual capacity* $c_f(u,v)$ for a pair of vertices $u,v \in V$ as follows,

$$
c_f(u,v) = \begin{cases}
    c(u,v) - f(u,v) & \text{if } (u,v) \in E \\
    f(u,v) & \text{if } (v,u) \in E \\
    0 & \text{ otherwise}
    \end{cases}
$$

and $G_f = (V, E_f)$ is the residual network after inducing $f$, where 

$$E_f = \{(u,v) \in V \times V : c_f (u,v) > 0\} $$

We established all the required setup to undo a flow in an edge. Now, lets see how it is used in practice.

<br>

## Ford-Fulkerson

The basic idea of the Ford-Fulkerson is very simple and is similar to what we did before, iteratively increase the flow in the network by finding a valid $s - t$ path and augmenting it, but the difference is we compute the path in $G_f$ instead of $G$. It terminates when it cannot find a $s - t$ path. 

```c
FORD-FULKERSON (G, s,t) {
    for each edge (u,v) in G.E
        (u,v).f = 0 
    while there exists a path from s to t in residual network G_f {
        c_f(p) = minimum of all the residual capacities of edges on the path.
        for each edge (u,v) in path {
            if (u,v) in G.E
                (u,v).f = (u,v).f + cf(p)
            else
                (v,u).f = (v,u).f - cf(p)
        }
    }
    return f
}
```

Below is the residual network for the previous example after three iterations.


Now, Ford Fulkerson can find a path $s \rightarrow a \rightarrow b \rightarrow d \rightarrow t$. If we augment that path to $G$, then  this *cancels* the flow $a\rightarrow b$ and diverts it to $b\rightarrow d \rightarrow t$. This leaves some space to push additional flow through $a \rightarrow c \rightarrow t$. In the next iteration, Ford Fulkerson can find a path $s \rightarrow a \rightarrow c \rightarrow t$ to induce 1 more unit of flow.

#### Analysis
If $f^\*$ is the maximum flow in the flow network $G$, then the algorithm executes the while loop atmost $\|f^*\|$ times, since the flow value increases by atleast 1 unit in each iteration and each iteration takes $O(E)$ to compute the path from $s-t$. Thus the time complexity of Ford-Fulkerson method is $O(\|f^\*\| E)$.

We don't want the runtime depends on the flow value. A very small network could have its flow value in billions and the Ford-Fulkerson method can take forever to return an answer. In addition, if we are not careful on how we select augmenting path, we end up doing waste work. To see what it means, let's look at the following example.

<script type="text/tikz">
\begin{document}
    \usetikzlibrary{automata, positioning}
    \tikzset{ vertex/.style={draw, circle, minimum size=0.75cm, node distance=3cm, >=stealth, fill=violet!20} }
    \tikzset{ source/.style={fill=green!20} }
    \tikzset{ sink/.style={fill=yellow!20} }
    \tikzset{ saturated/.style={opacity=0.2} }
    \tikzset{ residual/.style={magenta!70}}

    \begin{tikzpicture}
        \node[vertex, source] (s) {$s$};
        \node[vertex, above right of=s] (a) {$a$};
        \node[vertex, below right of=s] (b) {$b$};
        \node[vertex, sink, below right of=a] (t) {$t$};

        \path[->, thick] (s) edge[above, sloped] node {$10^9$} (a) edge[below, sloped] node {$10^9$} (b);
        \path[->, thick] (a) edge[above, sloped] node {$10^9$} (t) edge [left] node {$1$} (b);
        \path[->, thick] (b) edge[below, sloped] node {$10^9$} (t);
    \end{tikzpicture}
\end{document}
</script>

In this example, if we select the path $s \rightarrow a \rightarrow b \rightarrow t$ and push 1 unit of flow, then the edge $a \rightarrow b$ becomes *critical* and removed from the residual network.

<script type="text/tikz">
\begin{document}
    \usetikzlibrary{automata, positioning}
    \tikzset{ vertex/.style={draw, circle, minimum size=0.75cm, node distance=3cm, >=stealth, fill=violet!20} }
    \tikzset{ source/.style={fill=green!20} }
    \tikzset{ sink/.style={fill=yellow!20} }
    \tikzset{ saturated/.style={opacity=0.2} }
    \tikzset{ residual/.style={magenta!70}}

    \begin{tikzpicture}
        \node[vertex, source] (s) {$s$};
        \node[vertex, above right of=s] (a) {$a$};
        \node[vertex, below right of=s] (b) {$b$};
        \node[vertex, sink, below right of=a] (t) {$t$};

        \path[->, thick] (s) edge[above, sloped] node {$10^9-1$} (a) edge[below, sloped] node {$10^9$} (b);
        \path[->, thick] (a) edge[above, sloped] node {$10^9$} (t) 
        edge [saturated, left] node {$1$} (b)
        edge[bend left=15, residual, below] node {1} (s);
        \path[->, thick] (b) edge[below, sloped] node {$10^9-1$} (t)
        edge[residual,bend right=15, right] node {1} (a);
        \path[->, thick] (t) edge[residual, sloped, bend right=15, above] node{1} (b);
    \end{tikzpicture}
\end{document}
</script>

In the second iteration, if we select the path $s \rightarrow b \rightarrow a \rightarrow t$ to push 1 unit of flow, the flow from $b$ to $a$ *cancels* out and the original edge $a \rightarrow b$ comes back in the residual network. The flow is 2.

<script type="text/tikz">
\begin{document}
    \usetikzlibrary{automata, positioning}
    \tikzset{ vertex/.style={draw, circle, minimum size=0.75cm, node distance=3cm, >=stealth, fill=violet!20} }
    \tikzset{ source/.style={fill=green!20} }
    \tikzset{ sink/.style={fill=yellow!20} }
    \tikzset{ saturated/.style={opacity=0.2} }
    \tikzset{ residual/.style={magenta!70}}

    \begin{tikzpicture}
        \node[vertex, source] (s) {$s$};
        \node[vertex, above right of=s] (a) {$a$};
        \node[vertex, below right of=s] (b) {$b$};
        \node[vertex, sink, below right of=a] (t) {$t$};

        \path[->, thick] (s) edge[above, sloped] node {$10^9-1$} (a) edge[below, sloped] node {$10^9 - 1$} (b);
        \path[->, thick] (a) edge[above, sloped] node {$10^9-1$} (t) 
        edge [left] node {$1$} (b)
        edge[bend left=15, residual, below] node {1} (s);
        \path[->, thick] (b) edge[below, sloped] node {$10^9-1$} (t)
        edge [residual, sloped, above, bend right=15] node {1} (s);
        \path[->, thick] (t) edge[residual, sloped, bend right=15, above] node{1} (b)
        edge[residual, sloped, bend left=15, below] node {1} (a);
    \end{tikzpicture}
\end{document}
</script>

Now, it is possible that the Ford-Fulkerson method (in an unlucky case) to iteratively increase the flow by 1 unit by always selecting these two paths. This would result in $2 \times 10^9$ iterations. But had we chosen the the path $s \rightarrow a \rightarrow t$ and $s \rightarrow b \rightarrow t$, we only need 2 iterations.

Next, we see how some cleverness can help us to drastically improve the runtime.

## Edmonds-Karp

Edmonds-Karp algorithm is *an* implementation of the Ford-Fulkerson method, which always chooses shortest path from $s - t$ by using BFS and augments it to the network. Now, lets see how this help us to improve the runtime. The main intuition behind the Edmonds-Karp's algorithm is to always select shortest path to avoid long cycles, which helps to bound the number of augmenting paths to $O(VE)$. 


{% details Click here for detailed proof. %}
<br>

Theorem: Total number of flow augmentations in Edmonds-Karp is $O(VE)$.

To prove this, we first need to establish a bound on number of times an edge can become \emph{critical}. For this, we have to look closely at the distances of nodes from the source. 

We define $\delta_f (u,v)$ as the shortest path distance from $u$ to $v$ in $G_f$ where each edge has a unit distance.  Let $p = s\leadsto u \rightarrow v \leadsto t$ be a shortest path from $s$ to $t$ in $G_f$, thus $\delta_f (s,v) = \delta_f(s,u) + 1$. And let $u,v$ be the edge that becomes critical after augmenting the path and $f'$ be the new flow. Since, $(u,v)$ is saturated it'll not be in $G_{f'}$ and a reverse edge $(v,u)$ will be added to $G_{f'}$.

For the original edge $(u,v)$ to ever reappear and become critical again later in the process, we first have to push the flow backwards along the reversed edge $(v,u)$ to undo it. In order to push the flow backwards from $v$ to $u$, there must be a shortest path $\hat{p} = s \leadsto v \rightarrow u \leadsto t$ in some $G_{\hat{f}}$ and thus $\delta_{\hat f}(s,u) = \delta_{\hat f}(s,v) +1$.

We still need one more piece to prove the theorem. When we find an augmenting path, there will be atleast one critical edge in the path. This critical edge will be removed in the updated residual network $G_{f'}$. Thus the shortest path distance in $G_{f'}$ is non-decreasing, i.e, $\delta_{f'} (s,t) \geq \delta_f(s,t)$. This means that the new distance is at least greater than the old distance $\delta_{\hat f} (s,v) \geq \delta_f(s,v)$


$$
\begin{align*}
    \delta_{\hat f} (s,u) &= \delta_{\hat f}(s,v) + 1 \\
    &\geq \delta_f (s,v) + 1 \\
    &\geq \delta_f (s,u) + 1 + 1\\
    &\geq \delta_f (s,u) + 2
\end{align*}
$$


The above inequality tells us that every time an edge $(u,v)$ becomes re-saturated, its distance from $s$ must have increased by at least 2. 

Knowing that a simple path cannot be longer than the total number of vertices $V$ (without using a cycle, which the BFS avoids) and distance increases by at least 2 every time an edge is re-saturated, an edge can only become critical at most $V/2$ times before it becomes unreachable.

If a single edge can be critical at most $ V/2 $ times, and we have $E$ edges in the network. So there can be at most $(VE)/2 \in O(VE)$ total bottlenecks across the entire run of the algorithm.

{% enddetails %}

We know that the time complexity of BFS is $O(V+E)$. Given that all the nodes in the network has atleast one incoming and one outgoing edges (except $s$ and $t$), so $\|E\| > \|V\|$ and the time complexity simplifies to $O(E)$. There are at most $O(VE)$ iterations of BFS, thus Edmonds-Karp takes $O(VE^2)$ time.

## Applications
Flow networks show up in many real-world problems in computer science and operations research. Below are some,

* Transportation and Logistics: Flow networks are widely used to optimize the movement of goods through transportation systems. Nodes can represent warehouses, distribution centers, or retail stores, while edges represent routes with capacity constraints. By computing maximum flow or minimum-cost flow, companies can determine the most efficient way to ship products while avoiding bottlenecks.

* Communication and Data Networks: In computer networks, flow models help determine how data should be routed to maximize throughput and minimize congestion. Problems such as bandwidth allocation, packet routing, and network reliability can all be framed as flow problems, ensuring efficient use of infrastructure.

* Bipartite Matching and Assignment: Many assignment problems can be reduced to flow networks. For example, matching workers to jobs, students to schools, or tasks to machines can be modeled as a bipartite graph and solved using max-flow techniques. This ensures an optimal assignment under given constraints.