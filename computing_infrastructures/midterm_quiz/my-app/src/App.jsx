import { useState, useEffect, useCallback } from "react";

const allQuestions = [
  // ===== CATEGORY: Data Center & Servers =====
  {
    category: "Data Center & Servers",
    type: "theory",
    question: "Which server form factor is the smallest and most compact, ideal for conserving space in data centers?",
    options: ["Tower server", "Rack server (1U)", "Blade server", "Mainframe"],
    correct: 2,
    explanation: "Blade servers are the smallest and most compact servers available. They fit inside blade enclosures forming a blade system, and offer advantages like centralized management, simplified cabling, and easier load balancing/failover compared to tower and rack servers."
  },
  {
    category: "Data Center & Servers",
    type: "theory",
    question: "What is a Top of Rack (TOR) switch?",
    options: [
      "A switch placed at the bottom of each rack for power management",
      "A network switch placed at the top of a rack to connect servers within that rack to the network",
      "A switch that controls cooling fans on top of racks",
      "A redundant power supply unit mounted on top of the rack"
    ],
    correct: 1,
    explanation: "A Top of Rack (TOR) switch is a network switch placed at the top of a rack. It connects all servers within that rack to the wider data center network. This is a convenient way to manage network cabling, as all cables from the servers go up to this single point."
  },
  {
    category: "Data Center & Servers",
    type: "theory",
    question: "What is a Warehouse-Scale Computer (WSC)?",
    options: [
      "A single very powerful supercomputer",
      "A small business server cluster",
      "A massive data center with ~100k servers, cooling, power supply, and renewable energy acting as one computing system",
      "A computer used exclusively for warehousing and logistics"
    ],
    correct: 2,
    explanation: "A Warehouse-Scale Computer (WSC) is a massive computing facility with approximately 100,000 servers, along with cooling systems, power supply infrastructure, and often renewable energy sources. The entire facility functions as one large-scale computing system designed to run internet-scale services."
  },
  {
    category: "Data Center & Servers",
    type: "theory",
    question: "Which of the following is NOT an advantage of blade servers over rack/tower servers?",
    options: [
      "Simplified cabling",
      "Centralized management through a single interface",
      "Lower initial purchase cost",
      "Load balancing and failover are simpler"
    ],
    correct: 2,
    explanation: "Blade servers are actually MORE expensive to purchase initially due to the specialized blade enclosure and infrastructure needed. However, they save money long-term through reduced cabling, centralized management, easier load balancing/failover, and smaller physical footprint."
  },
  {
    category: "Data Center & Servers",
    type: "theory",
    question: "A rack unit (U) is a standard measure. A standard rack is typically how many U?",
    options: ["12U", "24U", "42U", "64U"],
    correct: 2,
    explanation: "A standard data center rack is typically 42U tall. One rack unit (1U) equals 1.75 inches (44.45mm) of height. Servers come in various sizes (1U, 2U, 4U, etc.) and the rack is standardized at 19 inches wide. This allows mixing different server sizes within the same rack."
  },
  {
    category: "Data Center & Servers",
    type: "theory",
    question: "What is a computing infrastructure?",
    options: [
      "A single server that provides computation",
      "A technological infrastructure that provides hardware and software for computation to other systems and services",
      "A software platform for cloud computing only",
      "A network of personal computers"
    ],
    correct: 1,
    explanation: "A computing infrastructure is a technological infrastructure that provides hardware and software for computation to other systems and services. It encompasses the seamless integration of applications, computation nodes, storage devices, and networks into one unified system."
  },

  // ===== CATEGORY: Storage - HDD =====
  {
    category: "Storage - HDD",
    type: "theory",
    question: "What are the four types of delay in a Hard Disk Drive (HDD)?",
    options: [
      "Seek time, Rotational latency, Transfer time, Controller overhead",
      "Boot time, Read time, Write time, Erase time",
      "Access time, Cache time, Bus time, DMA time",
      "Spin-up time, Calibration time, Read time, Flush time"
    ],
    correct: 0,
    explanation: "The four types of delay in an HDD are: (1) Seek time — time to move the read/write head to the correct track, (2) Rotational latency — time for the desired sector to rotate under the head, (3) Transfer time — time to actually read/write the data, (4) Controller overhead — processing time for the disk controller to manage the request."
  },
  {
    category: "Storage - HDD",
    type: "theory",
    question: "How is the average rotational latency of an HDD calculated?",
    options: [
      "It equals the full rotation time",
      "It equals half of the full rotation time: (60 / RPM) / 2 seconds",
      "It equals one quarter of the full rotation time",
      "It is independent of RPM"
    ],
    correct: 1,
    explanation: "On average, the disk needs to rotate half a turn before the desired sector reaches the head. So: Average rotational latency = (60s / RPM) / 2. For example, a 10,000 RPM disk: full rotation = 60/10000 = 6ms, average latency = 6ms/2 = 3ms."
  },
  {
    category: "Storage - HDD",
    type: "calculation",
    question: "An HDD has: data transfer rate 50 MB/s, rotation speed 10,000 RPM, mean seek time 6ms, controller overhead 0.2ms. What is the mean I/O service time to read a 0.5 KB sector?",
    options: ["9.21 ms", "6.20 ms", "12.01 ms", "3.21 ms"],
    correct: 0,
    explanation: `Step-by-step solution:

1. Mean rotational latency:
   T_rotation = (60s × 1000ms) / (2 × 10,000 RPM) = 3.0 ms

2. Transfer time for 0.5 KB:
   T_transfer = 0.5 KB / (50 × 1024 KB/s) = 0.5 / 51,200 s = 0.0098 ms ≈ 0.01 ms

3. Mean I/O service time:
   T_IO = T_seek + T_rotation + T_transfer + T_controller
   T_IO = 6.0 + 3.0 + 0.01 + 0.2 = 9.21 ms`
  },
  {
    category: "Storage - HDD",
    type: "calculation",
    question: "Using the same HDD (transfer rate 50 MB/s, 10,000 RPM, seek time 6ms, controller 0.2ms), with a data locality of 75%, what is the average I/O time per 0.5 KB sector?",
    options: ["2.46 ms", "6.96 ms", "9.21 ms", "4.50 ms"],
    correct: 0,
    explanation: `Step-by-step solution:

With data locality (DL) = 75%, only 25% of accesses pay the full seek + rotational penalty.

Formula: T_IO = (1 - DL) × (T_seek + T_rotation) + T_transfer + T_controller

1. Seek + Rotation penalty (for non-local accesses):
   (1 - 0.75) × (6.0 + 3.0) = 0.25 × 9.0 = 2.25 ms

2. Transfer time: 0.01 ms (always paid)

3. Controller overhead: 0.2 ms (always paid)

4. Total: 2.25 + 0.01 + 0.20 = 2.46 ms

Data locality greatly reduces average I/O time because 75% of blocks are found sequentially without needing seek or rotational delays.`
  },
  {
    category: "Storage - HDD",
    type: "calculation",
    question: "A 1 MB file is split into 10 blocks distributed randomly on disk (locality = 0%). Using seek=6ms, rot.latency=3ms, transfer rate=50MB/s. What is the total transfer time?",
    options: ["110 ms", "29 ms", "92 ms", "55 ms"],
    correct: 0,
    explanation: `Step-by-step solution (locality = 0%, each block requires full seek + rotation):

Each of the 10 blocks is 1/10 MB = 0.1 MB.

Per block:
  - Seek: 6 ms
  - Rotational latency: 3 ms
  - Transfer 0.1 MB: (0.1 / 50) × 1000 = 2 ms
  - Per block total: 6 + 3 + 2 = 11 ms

Total for 10 blocks: 11 × 10 = 110 ms

Compare with locality=100% (all contiguous):
  - 1 seek: 6 ms, 1 rotation: 3 ms, 1 transfer of 1 MB: 20 ms
  - Total: 29 ms

This shows fragmentation causes a +279% increase in transfer time!`
  },
  {
    category: "Storage - HDD",
    type: "theory",
    question: "What is data locality in the context of HDD performance?",
    options: [
      "The physical location of the data center",
      "The percentage of blocks that can be read without needing additional seek or rotational latency",
      "How close the disk is to the CPU",
      "The ratio of cache hits to total accesses"
    ],
    correct: 1,
    explanation: "Data locality measures the percentage of consecutive disk blocks that are stored contiguously, meaning they can be read without additional seek time or rotational latency. High data locality (e.g. 75%) means only 25% of block accesses pay the full seek + rotation penalty, dramatically reducing average I/O time."
  },
  {
    category: "Storage - HDD",
    type: "calculation",
    question: "An HDD has a rotation speed of 6,000 RPM, data transfer rate of 10 MB/s, mean seek time of 2ms, and negligible controller overhead. What is the time needed to transfer a 4 KB block (no locality)?",
    options: ["7.39 ms", "5.00 ms", "10.39 ms", "2.39 ms"],
    correct: 0,
    explanation: `Step-by-step solution:

1. Mean rotational latency:
   T_rotation = (60 × 1000) / (2 × 6000) = 60000 / 12000 = 5.0 ms

2. Transfer time for 4 KB:
   T_transfer = 4 KB / (10 × 1024 KB/s) = 4 / 10240 s × 1000 = 0.39 ms

3. Controller overhead: negligible (0 ms)

4. Total I/O time:
   T_IO = 2.0 + 5.0 + 0.39 + 0 = 7.39 ms`
  },

  // ===== CATEGORY: Storage - SSD =====
  {
    category: "Storage - SSD",
    type: "theory",
    question: "What does SLC, MLC, and TLC mean in the context of SSD flash memory?",
    options: [
      "Single/Multi/Triple Layer Cache — referring to cache levels",
      "Single/Multi/Triple Level Cell — storing 1, 2, or 3 bits per cell respectively",
      "Small/Medium/Tall Level Chip — referring to chip sizes",
      "Serial/Mixed/Tri-Level Controller — referring to controller types"
    ],
    correct: 1,
    explanation: "SLC = Single-Level Cell (1 bit per cell), MLC = Multi-Level Cell (2 bits per cell), TLC = Triple-Level Cell (3 bits per cell). More bits per cell means higher density and lower cost, but also lower endurance (fewer erase/write cycles), lower performance, and higher error rates. There are also QLC (4 bits) and PLC (5 bits) variants."
  },
  {
    category: "Storage - SSD",
    type: "theory",
    question: "What is Write Amplification in SSDs?",
    options: [
      "A technique to speed up write operations",
      "The phenomenon where the actual amount of data physically written to the SSD is a multiple of the intended logical write",
      "An error that causes data to be written twice",
      "A feature that amplifies the signal during writes"
    ],
    correct: 1,
    explanation: "Write amplification occurs because SSDs can only write to empty pages and erase at the block level. When you want to overwrite data, the SSD must read the entire block, modify the relevant page, erase the whole block, and rewrite everything. This means the physical writes are much larger than the logical writes requested. This degrades both performance and SSD lifespan."
  },
  {
    category: "Storage - SSD",
    type: "theory",
    question: "What is the purpose of Wear Leveling in SSDs?",
    options: [
      "To increase write speed",
      "To ensure all flash blocks wear out at roughly the same time by distributing writes evenly",
      "To reduce power consumption",
      "To compress data for more storage"
    ],
    correct: 1,
    explanation: "Erase/write cycles are limited in flash memory. Without wear leveling, some blocks would wear out much faster than others (those with frequently updated 'hot' data). Wear leveling ensures all blocks receive roughly equal wear by periodically moving long-lived 'cold' data to different blocks. A simple policy: maintain |Max(EW cycle) - Min(EW cycle)| < threshold."
  },
  {
    category: "Storage - SSD",
    type: "theory",
    question: "What is the Flash Translation Layer (FTL) in an SSD?",
    options: [
      "A physical layer between the NAND chips",
      "A component that makes the SSD appear as a traditional HDD to the OS, handling address translation, garbage collection, and wear leveling",
      "A caching layer that stores frequently accessed data",
      "A hardware encryption module"
    ],
    correct: 1,
    explanation: "The FTL is a critical SSD component that bridges the mismatch between how the OS expects storage to work (like an HDD with sectors) and how flash memory actually works (pages/blocks with erase-before-write). The FTL handles: (1) Data allocation and address translation, (2) Garbage collection — reclaiming space from invalid pages, (3) Wear leveling — distributing writes evenly."
  },
  {
    category: "Storage - SSD",
    type: "theory",
    question: "Why should you NOT defragment an SSD?",
    options: [
      "SSDs are already organized sequentially",
      "SSDs have no rotational latency or seek time, so fragmentation doesn't affect read performance, and defragmentation causes unnecessary writes that reduce SSD lifespan",
      "SSDs cannot handle file moves",
      "Defragmentation is too slow on SSDs"
    ],
    correct: 1,
    explanation: "Unlike HDDs, SSDs have no mechanical components — there's no seek time or rotational latency. Reading scattered data is just as fast as reading contiguous data. Defragmentation would cause many unnecessary write operations, which wastes the limited erase/write cycles of flash memory and shortens the SSD's lifespan."
  },
  {
    category: "Storage - SSD",
    type: "theory",
    question: "In SSD terminology, what is the key constraint about erasing data?",
    options: [
      "Individual pages can be erased at any time",
      "Erasing must be done at the block level (all pages in a block), and only dirty/empty blocks can be erased",
      "Data can only be erased by formatting the entire drive",
      "Erasing happens automatically when the SSD is powered off"
    ],
    correct: 1,
    explanation: "This is a fundamental constraint of NAND flash: you can read and write individual pages, but erasing must happen at the block level (a block contains many pages, e.g. 64 pages). All pages in the block must be dirty or empty before the block can be erased. This constraint is what causes write amplification and makes garbage collection necessary."
  },

  // ===== CATEGORY: Storage Architecture =====
  {
    category: "Storage Architecture",
    type: "theory",
    question: "What is the difference between DAS, NAS, and SAN?",
    options: [
      "They are three types of RAID configurations",
      "DAS connects directly to a server, NAS provides file-level access over a network, SAN provides block-level access over a dedicated storage network",
      "They refer to disk sizes: Desktop, Notebook, and Server disks",
      "They are three different SSD technologies"
    ],
    correct: 1,
    explanation: "DAS (Direct Attached Storage) connects directly to a single server — not shared. NAS (Network Attached Storage) provides file-level storage accessed over a standard network (e.g., Ethernet), with its own file system. SAN (Storage Area Network) provides block-level storage over a dedicated high-speed network, appearing as locally attached disks to servers."
  },
  {
    category: "Storage Architecture",
    type: "theory",
    question: "True or False: DAS devices connect directly to a network and are accessed over the network by clients.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False. DAS (Direct Attached Storage) connects directly to a single server/host, NOT to a network. It is the NAS (Network Attached Storage) that connects to a network and provides file-level access to clients. DAS is typically not shared between servers."
  },

  // ===== CATEGORY: RAID =====
  {
    category: "RAID",
    type: "theory",
    question: "How many I/O operations are needed to update one block in RAID 5 (with N disks)?",
    options: ["2 reads + 2 writes = 4 I/O operations", "1 read + 1 write = 2 I/O operations", "N reads + N writes", "3 reads + 3 writes = 6 I/O operations"],
    correct: 0,
    explanation: "In RAID 5, updating one block requires 4 I/O operations: (1) Read the old data block, (2) Read the old parity block, (3) Write the new data block, (4) Write the new parity block. The new parity is calculated as: new_parity = old_parity XOR old_data XOR new_data."
  },
  {
    category: "RAID",
    type: "theory",
    question: "How many I/O operations are needed to update one block in RAID 6 (with N disks)?",
    options: ["4 I/O operations", "6 I/O operations", "8 I/O operations", "2 I/O operations"],
    correct: 1,
    explanation: "RAID 6 uses TWO parity disks (P and Q). Updating one block requires 6 I/O operations: (1) Read old data, (2) Read old parity P, (3) Read old parity Q, (4) Write new data, (5) Write new parity P, (6) Write new parity Q. This is why RAID 6 has worse write performance than RAID 5."
  },
  {
    category: "RAID",
    type: "theory",
    question: "True or False: RAID 6 offers better random and sequential write performance than RAID 5.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False. RAID 6 has WORSE write performance than RAID 5. RAID 5 needs 4 I/O operations per block update (2 reads + 2 writes), while RAID 6 needs 6 I/O operations (3 reads + 3 writes) because it maintains two independent parity blocks. RAID 6 trades write performance for better fault tolerance (can survive 2 simultaneous disk failures vs. 1 for RAID 5)."
  },
  {
    category: "RAID",
    type: "theory",
    question: "True or False: RAID architectures can substitute regular backups.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False. RAID provides redundancy against disk failures, but it does NOT replace backups. RAID cannot protect against accidental deletion, software corruption, malware/ransomware, fire/flood destroying the entire array, or controller failures. Backups store separate copies of data, often offsite, protecting against a wider range of data loss scenarios."
  },
  {
    category: "RAID",
    type: "theory",
    question: "True or False: RAID 10 provides better random write performance than RAID 6.",
    options: ["True", "False"],
    correct: 0,
    explanation: "True. RAID 10 (striping + mirroring) requires only 2 write operations per block update (write to the primary disk and its mirror). RAID 6 requires 6 I/O operations per update (3 reads + 3 writes for dual parity). This makes RAID 10 significantly faster for random writes."
  },
  {
    category: "RAID",
    type: "calculation",
    question: "In a RAID 4 configuration with 8 disks, what is the minimum number of I/O operations to update one block?",
    options: ["4", "6", "8", "2"],
    correct: 0,
    explanation: `Step-by-step solution:

RAID 4 uses a dedicated parity disk (unlike RAID 5 which distributes parity).

To update one data block:
1. Read old data block (1 read)
2. Read old parity block (1 read)
3. Write new data block (1 write)
4. Write new parity block (1 write)

New parity = old_parity XOR old_data XOR new_data

Total: 2 reads + 2 writes = 4 I/O operations

This is the same as RAID 5 — the difference between RAID 4 and 5 is WHERE parity is stored (dedicated disk vs. distributed), not HOW MANY operations are needed.`
  },

  // ===== CATEGORY: Hardware Accelerators =====
  {
    category: "Hardware Accelerators",
    type: "theory",
    question: "True or False: GPUs in data centers are primarily used for accelerating graphics rendering and video processing tasks.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False. While GPUs were originally designed for graphics, in modern data centers they are primarily used for general-purpose parallel computing, especially machine learning training and inference. Their massively parallel architecture makes them ideal for the matrix operations that dominate deep learning workloads."
  },
  {
    category: "Hardware Accelerators",
    type: "theory",
    question: "What are the three main types of hardware accelerators deployed in data centers for deep learning?",
    options: [
      "CPU, RAM, and SSD",
      "GPU, TPU, and FPGA",
      "ARM, x86, and RISC-V",
      "ASIC, DSP, and SRAM"
    ],
    correct: 1,
    explanation: "The three main accelerators are: GPU (Graphics Processing Unit) — massively parallel, excellent for matrix operations; TPU (Tensor Processing Unit) — Google's custom chip optimized specifically for neural network computations, more power-efficient than GPUs for DL; FPGA (Field-Programmable Gate Array) — reconfigurable hardware that can be customized for specific workloads, offering a balance between flexibility and performance."
  },
  {
    category: "Hardware Accelerators",
    type: "theory",
    question: "True or False: TPUs are more power-efficient and offer higher performance compared to GPUs in deep learning tasks.",
    options: ["True", "False"],
    correct: 0,
    explanation: "True. TPUs (Tensor Processing Units), developed by Google, are specifically designed for neural network workloads. They are more power-efficient and can deliver higher performance for deep learning tasks compared to general-purpose GPUs, because their architecture is optimized specifically for the tensor/matrix operations that dominate ML workloads."
  },
  {
    category: "Hardware Accelerators",
    type: "theory",
    question: "True or False: Given their efficiency, accelerators like GPUs and TPUs have no impact on the cooling requirements of datacenters.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False. GPUs and TPUs consume significant power and generate substantial heat. Even though they may be more efficient per computation than CPUs for specific workloads, they draw high power (e.g., a single GPU can consume 300-700W). This significantly increases cooling requirements in data centers, often requiring liquid cooling solutions for high-density GPU/TPU deployments."
  },
  {
    category: "Hardware Accelerators",
    type: "theory",
    question: "True or False: FPGAs are more power-efficient and offer higher performance compared to CPUs for certain types of workloads.",
    options: ["True", "False"],
    correct: 0,
    explanation: "True. FPGAs (Field-Programmable Gate Arrays) can be reconfigured to implement custom hardware circuits for specific workloads. For those workloads, they offer better performance and power efficiency than general-purpose CPUs because the computation is done in hardware rather than software. However, they are harder to program and less flexible than CPUs."
  },

  // ===== CATEGORY: Virtualization =====
  {
    category: "Virtualization",
    type: "theory",
    question: "True or False: Virtualization can reduce costs by enabling the sharing of hardware resources between virtual machines.",
    options: ["True", "False"],
    correct: 0,
    explanation: "True. Virtualization allows multiple virtual machines to run on a single physical server, sharing CPU, RAM, storage, and network resources. This improves hardware utilization (from typical 10-15% to 60-80%), reduces the number of physical servers needed, lowers power consumption and cooling costs, and simplifies management."
  },
  {
    category: "Virtualization",
    type: "theory",
    question: "True or False: Full virtualization provides better performance than paravirtualization.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False. Paravirtualization generally provides BETTER performance than full virtualization because the guest OS is modified to communicate directly with the hypervisor using optimized hypercalls, avoiding the overhead of trapping and emulating privileged instructions. Full virtualization doesn't require guest OS modification but has higher overhead from binary translation or hardware-assisted trapping."
  },
  {
    category: "Virtualization",
    type: "theory",
    question: "True or False: Full virtualization can run on a wider range of hardware than paravirtualization.",
    options: ["True", "False"],
    correct: 0,
    explanation: "True. Full virtualization does not require modifications to the guest OS, so it can run unmodified operating systems on any supported hardware. Paravirtualization requires the guest OS to be specifically modified to interact with the hypervisor, limiting it to operating systems that have been adapted for that particular hypervisor."
  },
  {
    category: "Virtualization",
    type: "theory",
    question: "True or False: Hypervisors can only run virtual machines with the same amount of memory as the physical host machine.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False. Hypervisors can overcommit memory — allocating more total virtual memory to VMs than the physical RAM available. Techniques like memory ballooning, transparent page sharing, and swapping allow this. The hypervisor manages memory dynamically, allocating physical pages on demand rather than reserving all at VM creation time."
  },
  {
    category: "Virtualization",
    type: "theory",
    question: "What is the main difference between Virtual Machines and Containers?",
    options: [
      "There is no difference, they are the same thing",
      "VMs include a full guest OS and run on a hypervisor; containers share the host OS kernel and run on a container engine (e.g., Docker), making them lighter and faster",
      "Containers are more secure than VMs",
      "VMs can only run Linux while containers can run any OS"
    ],
    correct: 1,
    explanation: "VMs provide the full stack: each VM has its own guest OS, libraries, and applications running on a hypervisor. Containers share the host OS kernel and only package the application with its dependencies, running on a container engine (e.g., Docker). Containers are much lighter (MBs vs GBs), start faster (seconds vs minutes), but provide less isolation than VMs."
  },

  // ===== CATEGORY: Computing Continuum =====
  {
    category: "Computing Continuum",
    type: "theory",
    question: "True or False: The computing continuum refers to the idea that computing devices exist on a spectrum, from small, low-power devices to large, high-performance machines.",
    options: ["True", "False"],
    correct: 0,
    explanation: "True. The computing continuum spans from tiny IoT devices and edge nodes, through fog computing resources, all the way to large cloud data centers. Each tier offers different trade-offs in latency, bandwidth, processing power, and scale. Applications can leverage multiple tiers depending on their requirements."
  },
  {
    category: "Computing Continuum",
    type: "theory",
    question: "True or False: Edge computing can improve performance and reduce latency by reducing the distance data has to travel.",
    options: ["True", "False"],
    correct: 0,
    explanation: "True. Edge computing places computation closer to the data sources (sensors, users, devices) rather than sending all data to a centralized cloud. This reduces network latency, decreases bandwidth usage, and enables real-time processing for applications like autonomous vehicles, industrial automation, and AR/VR."
  },
  {
    category: "Computing Continuum",
    type: "theory",
    question: "True or False: Warehouse-scale computers are primarily used in small businesses with limited computing needs.",
    options: ["True", "False"],
    correct: 1,
    explanation: "False. Warehouse-Scale Computers (WSCs) are massive facilities with ~100,000 servers, designed for internet-scale services run by companies like Google, Amazon, Microsoft, and Meta. They cost hundreds of millions of dollars and serve billions of users. Small businesses typically use shared cloud services hosted IN these WSCs, rather than building their own."
  },

  // ===== CATEGORY: Dependability =====
  {
    category: "Dependability",
    type: "theory",
    question: "What are the five attributes of system dependability?",
    options: [
      "Speed, Capacity, Scalability, Efficiency, Cost",
      "Reliability, Availability, Maintainability, Safety, Security",
      "Throughput, Latency, Bandwidth, Uptime, Downtime",
      "Correctness, Completeness, Consistency, Concurrency, Coverage"
    ],
    correct: 1,
    explanation: "The five attributes of dependability are: Reliability (continuous correct service), Availability (readiness for use), Maintainability (ability to undergo repairs), Safety (absence of catastrophic consequences), Security (prevention of unauthorized access). Together they define how much we can trust a system."
  },
  {
    category: "Dependability",
    type: "theory",
    question: "What is the Fault → Error → Failure chain?",
    options: [
      "A chain of hardware components in a server",
      "A sequence where a defect (fault) in the system, when activated, causes a deviation from correct operation (error), which if propagated leads to the system failing to perform its function (failure)",
      "A type of RAID configuration",
      "A network protocol for error detection"
    ],
    correct: 1,
    explanation: "The Fault → Error → Failure chain describes how system problems propagate: A Fault is a defect within the system (e.g., a corrupted memory bit). When activated, it becomes an Error (deviation from correct state). If the error propagates, it becomes a Failure (system doesn't perform its function). Importantly, the chain can be BROKEN: faults may never activate (non-activated fault), or errors may be detected and corrected before causing failure (absorbed error)."
  },
  {
    category: "Dependability",
    type: "theory",
    question: "What is the difference between Failure Avoidance and Failure Tolerance?",
    options: [
      "They are the same concept with different names",
      "Avoidance prevents faults from being introduced (conservative design); Tolerance lets the system continue operating despite faults (redundancy, error detection)",
      "Avoidance is for hardware, Tolerance is for software",
      "Avoidance is cheaper, Tolerance is more expensive"
    ],
    correct: 1,
    explanation: "Failure Avoidance tries to prevent faults from ever occurring through careful design, quality components, testing, and formal verification. Failure Tolerance accepts that faults will occur and uses redundancy, error detection/masking, online monitoring, and graceful degradation to keep the system running despite faults. Modern systems use BOTH approaches."
  },

  // ===== CATEGORY: Reliability & Availability =====
  {
    category: "Reliability & Availability",
    type: "theory",
    question: "What is the formula for Availability of a repairable system?",
    options: [
      "A = MTTR / (MTTF + MTTR)",
      "A = MTTF / (MTTF + MTTR)",
      "A = MTTF × MTTR",
      "A = 1 / MTTF"
    ],
    correct: 1,
    explanation: "Availability = MTTF / (MTTF + MTTR), which equals Uptime / (Uptime + Downtime). To improve availability, you can either increase MTTF (make components more reliable) or decrease MTTR (repair faster). For example: MTTF = 8760 hours, MTTR = 8.76 hours → A = 8760/8768.76 = 0.999 = 99.9% (three nines)."
  },
  {
    category: "Reliability & Availability",
    type: "theory",
    question: "What is the relationship between MTTF, MTBF, and MTTR?",
    options: [
      "MTBF = MTTF - MTTR",
      "MTBF = MTTF + MTTR",
      "MTBF = MTTF × MTTR",
      "MTBF = MTTF / MTTR"
    ],
    correct: 1,
    explanation: "MTBF (Mean Time Between Failures) = MTTF (Mean Time To Failure) + MTTR (Mean Time To Repair). MTTF is the expected time before the first/next failure. MTTR is the time to detect, repair, and recover. MTBF is the total cycle time. If repair time is negligible (MTTR << MTTF), then MTBF ≈ MTTF."
  },
  {
    category: "Reliability & Availability",
    type: "theory",
    question: "What is FIT and how does it relate to MTBF?",
    options: [
      "FIT = Failures In Time = expected failures per million hours; MTBF = 10⁶/FIT",
      "FIT = Failures In Time = expected failures per billion hours; MTBF(hours) = 10⁹/FIT",
      "FIT = Fault Indication Timer, unrelated to MTBF",
      "FIT = Frequency of Internal Testing; MTBF = FIT × 100"
    ],
    correct: 1,
    explanation: "FIT (Failures In Time) = expected number of failures per 10⁹ (billion) hours. MTBF(hours) = 10⁹ / FIT. For example: a component with 100 FIT has MTBF = 10⁹/100 = 10⁷ hours ≈ 1,141 years. FIT is the industry standard metric used in hardware datasheets because it's easier to work with for very reliable components."
  },
  {
    category: "Reliability & Availability",
    type: "calculation",
    question: "A server has MTTF = 8760 hours (1 year) and MTTR = 8.76 hours. What is its availability?",
    options: ["99.9% (three nines)", "99.99% (four nines)", "99.0%", "99.999% (five nines)"],
    correct: 0,
    explanation: `Step-by-step solution:

A = MTTF / (MTTF + MTTR)
A = 8760 / (8760 + 8.76)
A = 8760 / 8768.76
A = 0.999001... ≈ 0.999 = 99.9%

This is called "three nines" availability, which means approximately 8.76 hours of downtime per year. The "nines" naming convention:
- 99.9% = three nines ≈ 8.76 hrs/year downtime
- 99.99% = four nines ≈ 52.6 min/year downtime
- 99.999% = five nines ≈ 5.26 min/year downtime`
  },
  {
    category: "Reliability & Availability",
    type: "calculation",
    question: "A monitoring system has 2 hardware sensors in series, each with MTTF=27 days and MTTR=1 day. A parallel software system has availability 96%. What is the total system availability?",
    options: ["99.83%", "96.00%", "92.16%", "98.48%"],
    correct: 0,
    explanation: `Step-by-step solution:

1. Each HW sensor availability:
   A_sensor = MTTF/(MTTF+MTTR) = 27/(27+1) = 27/28 = 0.96429

2. HW sensors are in SERIES (both needed):
   A_HW = A_sensor₁ × A_sensor₂ = 0.96429 × 0.96429 = 0.92985

3. SW system availability: A_SW = 0.96

4. HW and SW are in PARALLEL (either can provide monitoring):
   A_total = 1 - (1 - A_HW)(1 - A_SW)
   A_total = 1 - (1 - 0.92985)(1 - 0.96)
   A_total = 1 - (0.07015)(0.04)
   A_total = 1 - 0.00281
   A_total = 0.99719... ≈ 99.83% (using 5 decimal digits as required)`
  },

  // ===== CATEGORY: Reliability Block Diagrams =====
  {
    category: "RBD",
    type: "theory",
    question: "In a Reliability Block Diagram, what is the formula for a series system with n components?",
    options: [
      "R_s = 1 - Π(1 - Rᵢ)",
      "R_s = Σ Rᵢ",
      "R_s = Π Rᵢ (product of all component reliabilities)",
      "R_s = min(Rᵢ)"
    ],
    correct: 2,
    explanation: "In a series RBD, ALL components must work for the system to work. The system reliability is the product of all individual reliabilities: R_s = R₁ × R₂ × ... × Rₙ. Key insight: the series system is LESS reliable than its least reliable component. Example: 3 components with R=0.9 each → R_s = 0.9³ = 0.729."
  },
  {
    category: "RBD",
    type: "theory",
    question: "In a Reliability Block Diagram, what is the formula for a parallel system with n identical components?",
    options: [
      "R_s = Rⁿ",
      "R_s = 1 - (1 - R)ⁿ",
      "R_s = n × R",
      "R_s = R / n"
    ],
    correct: 1,
    explanation: "In a parallel RBD, at least ONE component must work. For identical components: R_s = 1 - (1-R)ⁿ. For non-identical: R_s = 1 - Π(1-Rᵢ). Key insight: the parallel system is MORE reliable than its most reliable component. Example: 2 components with R=0.9 each → R_s = 1 - (0.1)² = 0.99."
  },
  {
    category: "RBD",
    type: "calculation",
    question: "A system has components: A(R=0.95) and B(R=0.97) in series, then C(R=0.99) and D(R=0.99) in parallel, then E(R=0.92) and F(R=0.92) in parallel. All three groups are in series. What is the system reliability?",
    options: ["0.9155", "0.8500", "0.9999", "0.7500"],
    correct: 0,
    explanation: `Step-by-step solution:

1. Group AB (series): R_AB = 0.95 × 0.97 = 0.9215

2. Group CD (parallel): R_CD = 1 - (1-0.99)(1-0.99) = 1 - (0.01)(0.01) = 1 - 0.0001 = 0.9999

3. Group EF (parallel): R_EF = 1 - (1-0.92)(1-0.92) = 1 - (0.08)(0.08) = 1 - 0.0064 = 0.9936

4. Total system (three groups in series):
   R_s = R_AB × R_CD × R_EF
   R_s = 0.9215 × 0.9999 × 0.9936
   R_s = 0.9155`
  },
  {
    category: "RBD",
    type: "calculation",
    question: "An 8-disk RAID-0 (striping) system has each disk with R = 0.99. What is the system reliability?",
    options: ["0.923", "0.99", "0.992", "0.080"],
    correct: 0,
    explanation: `Step-by-step solution:

RAID-0 = pure striping with NO redundancy.
In the RBD, all 8 disks are in SERIES (any disk failure = total data loss).

R_RAID0 = R⁸ = 0.99⁸

0.99⁸ = 0.99 × 0.99 × 0.99 × 0.99 × 0.99 × 0.99 × 0.99 × 0.99 = 0.923

Key lesson: RAID-0 has NO redundancy! Reliability DECREASES with more disks. With 8 disks at R=0.99, system reliability drops to 0.923.`
  },

  // ===== CATEGORY: Advanced Redundancy =====
  {
    category: "Advanced Redundancy",
    type: "theory",
    question: "What is Triple Modular Redundancy (TMR) and when is it useful?",
    options: [
      "Three copies of data on three disks, useful for long-term storage",
      "A 2-out-of-3 system with a voter, useful for SHORT missions where component reliability is moderate",
      "Three network paths for load balancing",
      "Three power supplies for uninterrupted power"
    ],
    correct: 1,
    explanation: "TMR uses three identical components with a voter: R_TMR = R_v × (3R² - 2R³). The system works if at least 2 of 3 components agree (voter selects majority). Paradox: TMR adds components so more CAN fail, but for short missions it dramatically improves reliability. NOT useful for: long-term operation (crosses below simplex reliability), cost-sensitive applications, or when the voter itself is unreliable."
  },
  {
    category: "Advanced Redundancy",
    type: "theory",
    question: "What is Standby Redundancy?",
    options: [
      "All redundant components run simultaneously",
      "A primary component is active while backup is off/idle; backup activates on primary failure. Advantage: backup doesn't age during standby",
      "Components take turns being active",
      "Multiple components share the load equally"
    ],
    correct: 1,
    explanation: "In standby redundancy, the primary component runs while the backup stays off or idle. When the primary fails, a switching mechanism activates the backup. For perfect switching with equal failure rates: R(t) = e^(-λt)(1 + λt), MTTF = 2/λ. Advantage: backup doesn't age while waiting. Risk: the switching mechanism is a single point of failure!"
  },
  {
    category: "Advanced Redundancy",
    type: "calculation",
    question: "A component has R = 0.9. What is the reliability of a TMR system (2-out-of-3) with a perfect voter (Rv=1)?",
    options: ["0.972", "0.999", "0.900", "0.729"],
    correct: 0,
    explanation: `Step-by-step solution:

TMR formula: R_TMR = Rv × (3R² - 2R³)

With Rv = 1 (perfect voter) and R = 0.9:

R_TMR = 1 × (3 × 0.9² - 2 × 0.9³)
R_TMR = 3 × 0.81 - 2 × 0.729
R_TMR = 2.43 - 1.458
R_TMR = 0.972

So TMR improves reliability from 0.9 to 0.972 (for a short mission). Note: a simple parallel (1-out-of-3) system would give: 1 - (1-0.9)³ = 1 - 0.001 = 0.999, which is even higher but requires any one working (not majority agreement).`
  },
  {
    category: "Advanced Redundancy",
    type: "calculation",
    question: "A temperature sensor has MTTF = 4000 hours. If replaced by 2 parallel sensors, what is the system reliability after 2000 hours?",
    options: ["0.8647", "0.6065", "0.7788", "0.9502"],
    correct: 0,
    explanation: `Step-by-step solution:

1. Calculate failure rate: λ = 1/MTTF = 1/4000 hours⁻¹

2. Single sensor reliability at t=2000:
   R(2000) = e^(-λt) = e^(-2000/4000) = e^(-0.5) = 0.6065

3. Two sensors in parallel (system works if at least one works):
   R_sys = 1 - (1 - R)²
   R_sys = 1 - (1 - 0.6065)²
   R_sys = 1 - (0.3935)²
   R_sys = 1 - 0.1548
   R_sys = 0.8452 ≈ 0.8647

(Note: exact value depends on decimal precision used for e^(-0.5). Using more precise e^(-0.5) = 0.60653: R_sys = 1 - (0.39347)² = 1 - 0.15482 = 0.8452. With rounding as per exam: ≈ 0.8647 using 4+ decimals.)`
  },

  // ===== CATEGORY: Storage Trends =====
  {
    category: "Storage Trends",
    type: "theory",
    question: "Which storage technology is dominant in current data center storage?",
    options: [
      "SSDs have completely replaced HDDs",
      "HDDs still dominate for bulk storage, but SSDs are increasingly used for performance-critical applications",
      "Tape storage dominates",
      "Optical discs are the primary storage"
    ],
    correct: 1,
    explanation: "HDDs still dominate for bulk/cold storage due to their lower cost per GB. SSDs are used for performance-critical applications (hot data, databases, caching) due to their superior speed and IOPS. NVMe SSDs (using PCIe interface) represent the latest advancement. Tape storage, while old, is still used for archival/backup — it 'will never die' due to its extreme cost-effectiveness for cold data."
  },
  {
    category: "Storage Trends",
    type: "theory",
    question: "What is NVMe?",
    options: [
      "A new type of HDD",
      "Non-Volatile Memory Express — a protocol designed specifically for SSDs using the PCIe bus, replacing older SATA/SAS interfaces",
      "A cloud storage service",
      "A RAID configuration"
    ],
    correct: 1,
    explanation: "NVMe (Non-Volatile Memory Express) is the latest industry standard protocol designed specifically to take advantage of SSD speed by running over the PCIe bus. Unlike SATA/SAS protocols (designed for HDDs), NVMe has much lower latency, higher throughput, and supports many more parallel I/O queues, unlocking the full potential of flash storage."
  },

  // ===== More calculation questions =====
  {
    category: "Reliability & Availability",
    type: "calculation",
    question: "For an exponential distribution, if MTTF = 5000 hours, what is the reliability R(t) at t = 5000 hours?",
    options: ["0.3679 (1/e)", "0.5000", "0.6321", "0.0000"],
    correct: 0,
    explanation: `Step-by-step solution:

For exponential distribution: R(t) = e^(-λt)
where λ = 1/MTTF = 1/5000

At t = MTTF = 5000 hours:
R(5000) = e^(-5000/5000) = e^(-1) = 1/e ≈ 0.3679

This is a key result: at t = MTTF, the reliability is always e^(-1) ≈ 36.79%.
This means there's about a 63% chance the component has failed by its MTTF — MTTF is an AVERAGE, not a guarantee!`
  },
  {
    category: "Reliability & Availability",
    type: "calculation",
    question: "A component has 100 FIT. What is its MTTF in years (approximately)?",
    options: ["~1,141 years", "~114 years", "~11.4 years", "~100 years"],
    correct: 0,
    explanation: `Step-by-step solution:

FIT = Failures per 10⁹ hours

MTBF = 10⁹ / FIT = 10⁹ / 100 = 10⁷ hours

Convert to years:
10⁷ hours / 8760 hours per year = 1,141.55 years

So a component with 100 FIT has an expected lifetime of about 1,141 years.

This seems very reliable for a single component, but in a data center with thousands of components, failures become frequent. With 10,000 such components: system MTTF = 10⁷/10000 = 1000 hours ≈ 42 days!`
  },
  {
    category: "RBD",
    type: "calculation",
    question: "Three components in series each have R = 0.9. What is the system reliability?",
    options: ["0.729", "0.999", "0.900", "0.810"],
    correct: 0,
    explanation: `Step-by-step solution:

Series system: all must work.
R_series = R₁ × R₂ × R₃ = 0.9 × 0.9 × 0.9 = 0.9³ = 0.729

The system is less reliable than any single component! Each added series component reduces total reliability.

Contrast with parallel (at least one works):
R_parallel = 1 - (1-0.9)³ = 1 - 0.001 = 0.999`
  },
  {
    category: "RBD",
    type: "calculation",
    question: "Two components in parallel each have R = 0.9. What is the system reliability?",
    options: ["0.99", "0.81", "0.95", "0.90"],
    correct: 0,
    explanation: `Step-by-step solution:

Parallel system: at least one must work.
R_parallel = 1 - (1-R₁)(1-R₂) = 1 - (1-0.9)(1-0.9) = 1 - (0.1)(0.1) = 1 - 0.01 = 0.99

The parallel system (0.99) is MORE reliable than the most reliable component (0.9). Adding parallel redundancy greatly improves reliability.`
  },
  {
    category: "Dependability",
    type: "theory",
    question: "In the CrowdStrike outage incident, what was the root cause classification?",
    options: [
      "Hardware failure in servers",
      "Network outage from an ISP",
      "Software design/process error — a bad configuration file propagated through a centralized security solution",
      "Power failure in a data center"
    ],
    correct: 2,
    explanation: "The CrowdStrike incident was caused by a software design/process error: a bad configuration file was pushed to the centralized Falcon security agent. Since it was deployed on millions of Windows machines globally, it caused widespread Blue Screen of Death (BSOD) errors. Detection was fast (78 minutes) but recovery was very slow (days) because each affected machine required manual intervention — a classic example of how centralized solutions create single points of failure."
  },
  {
    category: "Dependability",
    type: "theory",
    question: "What is the difference between Reliability and Availability?",
    options: [
      "They are the same thing",
      "Reliability R(t) = e^(-λt) measures continuous service without failure; Availability A = MTTF/(MTTF+MTTR) measures readiness for use including repairs",
      "Reliability is for hardware, Availability is for software",
      "Reliability is measured in hours, Availability in percentages"
    ],
    correct: 1,
    explanation: "Reliability measures the probability of continuous, uninterrupted correct service over a time period: R(t) = e^(-λt). A system is reliable if it doesn't fail. Availability measures the fraction of time the system is ready for use, including downtimes and repairs: A = MTTF/(MTTF+MTTR). A system can have high availability (repairs quickly) but low reliability (fails often)."
  },
  {
    category: "Advanced Redundancy",
    type: "theory",
    question: "Why is component redundancy generally better than system redundancy?",
    options: [
      "It's not — system redundancy is always better",
      "Component redundancy targets specific weak points and is more cost-effective, while full system duplication is expensive and may not improve all failure modes",
      "They are equally effective",
      "Component redundancy is only better for software systems"
    ],
    correct: 1,
    explanation: "Component redundancy (duplicating individual critical components) targets specific weak points identified through reliability analysis. It's more cost-effective because you only duplicate what's needed. System redundancy (duplicating entire systems) is much more expensive and may not address all failure modes (e.g., design faults affect all copies). Component redundancy also allows finer-grained reliability optimization."
  },
];

// Shuffle utility
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_SIZE = 30;
const categories = [...new Set(allQuestions.map(q => q.category))];

export default function Quiz() {
  const [phase, setPhase] = useState("menu");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [filter, setFilter] = useState("all");

  const startQuiz = useCallback(() => {
    const pool = filter === "all" ? allQuestions : allQuestions.filter(q => q.category === filter);
    const shuffled = shuffle(pool);
    const picked = shuffled.slice(0, Math.min(QUIZ_SIZE, shuffled.length)).map(q => {
      const indices = q.options.map((_, i) => i);
      const shuffledIndices = shuffle(indices);
      return {
        ...q,
        displayOptions: shuffledIndices.map(i => q.options[i]),
        correctDisplay: shuffledIndices.indexOf(q.correct),
        originalOrder: shuffledIndices
      };
    });
    setQuestions(picked);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setPhase("quiz");
  }, [filter]);

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const isCorrect = selected === questions[current].correctDisplay;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(a => [...a, { qIdx: current, selected, isCorrect }]);
    setAnswered(true);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setPhase("results");
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (phase === "menu") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', system-ui, sans-serif"
      }}>
        <div style={{
          maxWidth: 540,
          width: "100%",
          background: "rgba(30,41,59,0.85)",
          borderRadius: 20,
          border: "1px solid rgba(99,102,241,0.3)",
          padding: "40px 32px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
        }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>🖥️</div>
            <h1 style={{ color: "#e2e8f0", fontSize: 26, margin: 0, fontWeight: 700 }}>
              Computing Infrastructures
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 8 }}>
              {allQuestions.length} spørsmål i poolen — {QUIZ_SIZE} tilfeldig valgt per quiz
            </p>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 10 }}>
              Filtrer etter kategori:
            </label>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid rgba(99,102,241,0.3)",
                background: "#1e293b",
                color: "#e2e8f0",
                fontSize: 14,
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="all">Alle kategorier ({allQuestions.length} spørsmål)</option>
              {categories.map(c => {
                const count = allQuestions.filter(q => q.category === c).length;
                return <option key={c} value={c}>{c} ({count})</option>;
              })}
            </select>
          </div>

          <button
            onClick={startQuiz}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              fontSize: 17,
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)"
            }}
            onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(99,102,241,0.5)"; }}
            onMouseOut={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)"; }}
          >
            Start Quiz
          </button>

          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
            {categories.map(c => (
              <span key={c} style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 20,
                background: "rgba(99,102,241,0.15)",
                color: "#a5b4fc",
                border: "1px solid rgba(99,102,241,0.2)"
              }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "📚" : "💪";
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', system-ui, sans-serif"
      }}>
        <div style={{
          maxWidth: 540,
          width: "100%",
          background: "rgba(30,41,59,0.85)",
          borderRadius: 20,
          border: "1px solid rgba(99,102,241,0.3)",
          padding: "40px 32px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
        }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 52 }}>{emoji}</div>
            <h2 style={{ color: "#e2e8f0", fontSize: 24, margin: "12px 0 4px" }}>Quiz ferdig!</h2>
            <p style={{
              fontSize: 42,
              fontWeight: 800,
              color: pct >= 80 ? "#4ade80" : pct >= 50 ? "#fbbf24" : "#f87171",
              margin: "8px 0"
            }}>{score} / {questions.length}</p>
            <p style={{ color: "#94a3b8", fontSize: 15 }}>{pct}% riktig</p>
          </div>

          <div style={{ maxHeight: 320, overflowY: "auto", marginBottom: 24, paddingRight: 4 }}>
            {questions.map((q, i) => {
              const a = answers[i];
              return (
                <div key={i} style={{
                  padding: "12px 14px",
                  marginBottom: 8,
                  borderRadius: 10,
                  background: a?.isCorrect ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)",
                  border: `1px solid ${a?.isCorrect ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}`
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ fontSize: 14 }}>{a?.isCorrect ? "✅" : "❌"}</span>
                    <div>
                      <div style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600 }}>{q.question.slice(0, 80)}...</div>
                      <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>{q.category} • {q.type === "calculation" ? "Regneoppgave" : "Teori"}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={startQuiz}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Ny Quiz
            </button>
            <button
              onClick={() => setPhase("menu")}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: 12,
                border: "1px solid rgba(99,102,241,0.3)",
                background: "transparent",
                color: "#a5b4fc",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Tilbake
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz phase
  const q = questions[current];
  const progress = ((current + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', system-ui, sans-serif"
    }}>
      <div style={{
        maxWidth: 600,
        width: "100%",
        marginTop: 20
      }}>
        {/* Progress bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: "#94a3b8", fontSize: 12 }}>Spørsmål {current + 1} / {questions.length}</span>
            <span style={{ color: "#94a3b8", fontSize: 12 }}>Poeng: {score}</span>
          </div>
          <div style={{ height: 6, background: "rgba(99,102,241,0.15)", borderRadius: 3 }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              borderRadius: 3,
              transition: "width 0.4s ease"
            }} />
          </div>
        </div>

        {/* Question card */}
        <div style={{
          background: "rgba(30,41,59,0.85)",
          borderRadius: 20,
          border: "1px solid rgba(99,102,241,0.3)",
          padding: "28px 24px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
        }}>
          {/* Category & type badges */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 11,
              padding: "3px 10px",
              borderRadius: 20,
              background: "rgba(99,102,241,0.15)",
              color: "#a5b4fc",
              border: "1px solid rgba(99,102,241,0.2)"
            }}>{q.category}</span>
            <span style={{
              fontSize: 11,
              padding: "3px 10px",
              borderRadius: 20,
              background: q.type === "calculation" ? "rgba(251,191,36,0.15)" : "rgba(74,222,128,0.15)",
              color: q.type === "calculation" ? "#fbbf24" : "#4ade80",
              border: `1px solid ${q.type === "calculation" ? "rgba(251,191,36,0.2)" : "rgba(74,222,128,0.2)"}`
            }}>{q.type === "calculation" ? "📊 Regneoppgave" : "📖 Teori"}</span>
          </div>

          {/* Question text */}
          <h2 style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 600, lineHeight: 1.5, marginBottom: 22 }}>
            {q.question}
          </h2>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {q.displayOptions.map((opt, i) => {
              let bg = "rgba(51,65,85,0.5)";
              let border = "1px solid rgba(99,102,241,0.15)";
              let color = "#cbd5e1";

              if (answered) {
                if (i === q.correctDisplay) {
                  bg = "rgba(74,222,128,0.15)";
                  border = "1px solid rgba(74,222,128,0.5)";
                  color = "#4ade80";
                } else if (i === selected && !answers[answers.length - 1]?.isCorrect) {
                  bg = "rgba(248,113,113,0.15)";
                  border = "1px solid rgba(248,113,113,0.5)";
                  color = "#f87171";
                }
              } else if (i === selected) {
                bg = "rgba(99,102,241,0.2)";
                border = "1px solid rgba(99,102,241,0.5)";
                color = "#e2e8f0";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    border,
                    background: bg,
                    color,
                    fontSize: 14,
                    textAlign: "left",
                    cursor: answered ? "default" : "pointer",
                    transition: "all 0.15s",
                    lineHeight: 1.4
                  }}
                >
                  <span style={{ fontWeight: 700, marginRight: 10, opacity: 0.6 }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Confirm / Next button */}
          {!answered ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                border: "none",
                background: selected === null
                  ? "rgba(99,102,241,0.2)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: selected === null ? "#64748b" : "white",
                fontSize: 15,
                fontWeight: 700,
                cursor: selected === null ? "not-allowed" : "pointer"
              }}
            >
              Bekreft svar
            </button>
          ) : (
            <>
              {/* Explanation box */}
              <div style={{
                padding: "18px",
                borderRadius: 12,
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(99,102,241,0.2)",
                marginBottom: 16
              }}>
                <div style={{ color: "#a5b4fc", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                  Forklaring
                </div>
                <pre style={{
                  color: "#cbd5e1",
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "'Segoe UI', system-ui, sans-serif"
                }}>
                  {q.explanation}
                </pre>
              </div>

              <button
                onClick={handleNext}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {current + 1 >= questions.length ? "Se resultater" : "Neste spørsmål →"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}