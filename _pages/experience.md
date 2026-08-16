---
layout: page
permalink: /experience/
title: Experience
nav: true
nav_order: 4
---

<!-- Iowa State University -->
<div class="experience-card">
  <div class="experience-header">
    <img src="{{ '/assets/img/swapp-logo.png' | relative_url }}" alt="Iowa State University Logo" class="company-logo">
    <div class="header-details">
      <div class="title-row">
        <h3 class="role-title">Research Assistant</h3>
        <span class="date-range">March 2024 – December 2025</span>
      </div>
      <div class="company-info">
        SwAPP Lab (Iowa State University) <span class="location">| Ames, Iowa</span>
      </div>
    </div>
  </div>

  <div class="tech-badges">
    <span class="badge-item">C++</span>
    <span class="badge-item">Linux</span>
    <span class="badge-item">CMake</span>
    <span class="badge-item">GCC</span>
    <span class="badge-item">Conan</span>
    <span class="badge-item">Pthreads</span>
    <span class="badge-item">Intel VTune</span>
    <span class="badge-item">Perf</span>
    <span class="badge-item">GDB</span>
    <span class="badge-item">Strace</span>
    <span class="badge-item">Google Test</span>
    <span class="badge-item">Google Benchmark</span>
    <span class="badge-item">Gurobi Solver</span>
  </div>

  <ul class="experience-bullets">
    <li>Parallelization of a Mixed-Integer Programming (MIP) solver for network flow optimization problems.</li>
    <li>Designed and implemented a custom lock-free work-stealing algorithm that outperformed the industry-standard C++ Taskflow library's work-stealing algorithm by <strong>4x</strong> for specific solver workloads.</li>
    <li>Identified critical regions of the codebase using Intel VTune and Perf profilers, and optimized key data structures to reduce cache misses and working set size, resulting in a <strong>~20% performance improvement</strong>.</li>
    <li>Designed a new concurrent data structure to efficiently manage tens of thousands of nodes shared among concurrent reader and writer threads.</li>
    <li>Collaborated with Operations Research PhDs to translate abstract mathematical models into high-performance, thread-safe code.</li>
  </ul>
</div>

<!-- Accenture -->
<div class="experience-card">
  <div class="experience-header">
    <img src="{{ '/assets/img/accenture.svg' | relative_url }}" alt="Accenture Logo" class="company-logo">
    <div class="header-details">
      <div class="title-row">
        <h3 class="role-title">Application Development Associate</h3>
        <span class="date-range">December 2021 – January 2023</span>
      </div>
      <div class="company-info">
        Accenture <span class="location">| Bengaluru, India</span>
      </div>
    </div>
  </div>

  <div class="tech-badges">
    <span class="badge-item">Java</span>
    <span class="badge-item">Spring Framework</span>
    <span class="badge-item">Hibernate</span>
    <span class="badge-item">Apache Maven</span>
    <span class="badge-item">Postman</span>
    <span class="badge-item">MySQL</span>
    <span class="badge-item">MongoDB</span>
  </div>

  <ul class="experience-bullets">
    <li>Developed REST backend microservices to manage a production system of <strong>400K+ users</strong>.</li>
    <li>Improved write-path latency by <strong>15%</strong> with multithreading and by <strong>9%</strong> through refactoring data access patterns.</li>
    <li>Optimized backend architecture by consolidating redundant microservices into a unified, high-performance service.</li>
    <li>Eliminated network serialization overhead to reduce end-to-end latency and cut AWS compute costs by <strong>10%</strong>.</li>
    <li>Actively participated in Accenture Green Cloud Initiative.</li>
  </ul>
</div>

<!-- National Institute of Wind Energy -->
<div class="experience-card">
  <div class="experience-header">
    <img src="{{ '/assets/img/niwe-logo.png' | relative_url }}" alt="NIWE Logo" class="company-logo">
    <div class="header-details">
      <div class="title-row">
        <h3 class="role-title">Data Analyst Intern</h3>
        <span class="date-range">September 2021 – October 2021</span>
      </div>
      <div class="company-info">
        National Institute of Wind Energy <span class="location">| Chennai, India</span>
      </div>
    </div>
  </div>

  <div class="tech-badges">
    <span class="badge-item">Python</span>
    <span class="badge-item">Pandas</span>
    <span class="badge-item">NumPy</span>
  </div>

  <ul class="experience-bullets">
    <li>Developed automated Python scripts and pipelines to analyze solar radiation data and perform EDA.</li>
    <li>Reduced data collection time by <strong>5x</strong> with 8 threads polling the data server.</li>
  </ul>
</div>

<!-- Hindustan Aeronautics Limited -->
<div class="experience-card">
  <div class="experience-header">
    <img src="{{ '/assets/img/hal-logo.png' | relative_url }}" alt="HAL Logo" class="company-logo">
    <div class="header-details">
      <div class="title-row">
        <h3 class="role-title">Summer Intern</h3>
        <span class="date-range">May 2019 – July 2021</span>
      </div>
      <div class="company-info">
        Hindustan Aeronautics Limited <span class="location">| Bangalore, India</span>
      </div>
    </div>
  </div>

  <div class="tech-badges">
    <span class="badge-item">Engineering</span>
    <span class="badge-item">Aerospace Systems</span>
  </div>

  <ul class="experience-bullets">
    <li>Gained hands-on exposure to aerospace manufacturing and quality assurance workflows.</li>
  </ul>
</div>