---
layout: page
permalink: /experience/
title: Experience
# description: Materials for courses you taught. Replace this text with your description.
nav: true
nav_order: 4
---

<!-- For now, this page is assumed to be a static description of your courses. You can convert it to a collection similar to `_projects/` so that you can have a dedicated page for each course.

Organize your courses by years, topics, or universities, however you like! -->


### Research Assistant (Software Engineering)
Iowa State University $\quad | \quad$ Ames, Iowa $\quad |\quad$ March 2024 -- December 2025

C++, Linux, CMake, GCC, Conan, Pthreads, Intel VTune, Perf (Linux), GDB, Strace, Google Test, Google Benchmark, Gurobi Solver 

* Parallelization of a Mixed-Integer Programming (MIP) solver for network flow optimization problems.
* Designed and implemented a custom lock-free work-stealing algorithm that outperformed the industry-standard C++ Taskflow library's work-stealing algorithm by $4x$ for specific solver workloads.
* Identified critical regions of the codebase using Intel VTune and Perf profilers, and optimized key data structures to reduce cache misses, and working set size, resulted in $\approx 20\%$ performance improvement.
* Designed a new concurrent data structure to efficiently manage tens of thousands of nodes shared among concurrent reader and writer threads.
* Collaborated with Operations Research PhDs to translate abstract mathematical models into high-performance, thread-safe code.
<!-- * Designed a new lock-free work-stealing algorithm that is $4x$ faster than C++ taskflow for bulk operations in Single-stealer scenarios. -->


### Application Development Associate 
Accenture $\quad | \quad$ Bengaluru, India $\quad | \quad$ December 2021 -- January 2023

Java, Spring Framework, Hibernate, Apache Maven, Postman, MySQL, MongoDB
* Developed REST backend microservices to manage a production system of 400K+ users.
* Improved write-path latency by $15\%$ with multithreading and by $9\%$ through refactoring the data access patterns.
* Optimized backend architecture by consolidating redundant microservices into a unified, high-performance service.
* Eliminated network serialization overhead to reduce end-to-end latency and cut AWS compute costs by $10\%$.
* Actively participated in Accenture Green Cloud Initiative.


### Data Analyst Intern
National Institute of Wind Energy $\quad | \quad$ Chennai, India $\quad | \quad$ September 2021 -- October 2021

Python, Pandas, Numpy
* Developed automated python scripts and pipelines to analyze solar radiation data and perform EDA.
* Reduced the data collection time by 5x with 8 threads polling the data server.

### Summer Intern
Hindustan Aeronautics Limited $\quad | \quad$ Bangalore, India $\quad | \quad$ May 2019 -- July 2021