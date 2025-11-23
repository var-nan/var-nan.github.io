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


### Graduate Research Assistant
Iowa State University $\quad | \quad$ Ames, Iowa $\quad |\quad$ March 2024 -- Present

C++, Linux, CMake, GCC, Conan, Pthreads, Intel VTune, Perf (Linux), GDB, Strace, Google Test, Google Benchmark, Gurobi Solver 

* Parallelization of a Mixed-Integer Programming (MIP) solver for network flow optimization problems.
* Identified critical regions of the codebase using Intel VTune and Perf profilers, and optimized key data structures to reduce cache misses, and working set size. Resulted $\approx 20\%$ performance improvement.
* Designed a new concurrent data structure to efficiently manage tens of thousands of nodes shared among concurrent reader and writer threads.
* Designed a new lock-free work-stealing algorithm that is $4x$ faster than C++ taskflow for bulk operations in Single-stealer scenarios.


### Application Development Associate 
Accenture $\quad | \quad$ Bengaluru, India $\quad | \quad$ December 2021 -- January 2023

Java, Spring Framework, Hibernate, Apache Maven, Postman, MySQL, MongoDB
* Built REST microservices for a fintech client with API gateway pattern to maintain ($> 400K$) user profiles.
* Improved API response time of insert requests by $15\%$ with multithreading and by $9\%$ with refactoring.


### Data Analyst Intern
National Institute of Wind Energy $\quad | \quad$ Chennai, India $\quad | \quad$ September 2021 -- October 2021

Python, Pandas, Numpy
* Developed automated python scripts and pipelines to analyze solar radiation data and perform EDA.
* Reduced the data collection time by 5x with 8 threads polling the data server.
