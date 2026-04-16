---
layout: distill
title: Floyd's Cycle Detection
date: 2026-02-13 10:00:00
description: Detecting cycle in a linked list.
tags: cycle-detection linked-list graph
categories: algorithm
featured: true
tikzjax: true
header-includes:
    - \usepackage{tikz}
---

Given a linked list, the question is to find if the linked list contains a cycle or not. If it does contain a cycle, find the start of the cycle. 

<br>

<script type="text/tikz">
\begin{document}
    \usetikzlibrary{arrows.meta, positioning}
    \begin{tikzpicture}[
            node distance=1.8cm,
            every node/.style={draw, circle, minimum size=1cm},
            >=Stealth
        ]
        % Linear part
        \node (n1) {1};
        \node (n2) [right of=n1] {2};
        \node (n3) [right of=n2] {3};
        \node (n4) [right of=n3] {4};
        \node (n5) [below right of=n4] {5};

        % Cycle 
        \node (n6) [below of=n5] {6};
        \node (n7) [below left of=n6] {7};
        \node (n8) [above left of=n7] {8};
        \node (n9) [above of=n8] {9};
        \node (head) [draw=none, below of=n1] {\small Head};
        % Edges (linear part)
        \draw[->] (n1) -- (n2);
        \draw[->] (n2) -- (n3);
        \draw[->] (n3) -- (n4);
        \draw[->] (n4) -- (n5);
        % Edges (cycle)
        \draw[->] (n5) -- (n6);
        \draw[->] (n6) -- (n7);
        \draw[->] (n7) -- (n8);
        \draw[->] (n8) -- (n9);
        \draw[->] (n9) to (n4);

        \draw[->, pink] (head) to (n1);
    \end{tikzpicture}
\end{document}
</script>

<br>

Simply, we can check if the given linked list contains a cycle or not with a hash map. Start iterating at the `head` and keep track of the node (pointers) in a hash map. If a node (pointer) already exists in the hash, then a cycle exists and that pointer will be the start of the cycle. The has $O(N)$ time and $O(N)$ space complexity, where $N$ is the number of nodes in the linked list.

Now, if we want to solve the same problem with $O(1)$ memory, we need to use Floyd's Cycle algorithm or Tortoise and Hare algorithm. In this we use make use of $fast$-and-$slow$ pointer approach. 

## Floyd's Cycle detection

In this algorithm, we make use of $fast$ and $slow$ pointers that both start at the `head`. $fast$ pointer moves at $2x$ than $slow$ pointer. These both pointers iterates until either (a) $fast$ becomes `NULL` or (b) $fast$ = $slow$. When $fast$ becomes `NULL`, it means that there is no cycle. If the linked list has a cycle, then these two pointers meet *somewhere* on the cycle (proof below). From the below figure, both the pointers meet at Node 7.

{% details Click here to know why both pointers meet in a cycle %}
The relative speed between the $fast$ and $slow$ pointers is 1. Inside the cycle of length $C$, the distance between the $fast$ and $slow$ decreases by 1 and after atmost $C$ steps, both pointers meet.
{% enddetails %}

<br>

<script type="text/tikz">
        \begin{document}
    \usetikzlibrary{arrows.meta, positioning}
        \begin{tikzpicture}[
            node distance=1.8cm,
            every node/.style={draw, circle, minimum size=1cm},
            >=Stealth
        ]
        % Linear part
        \node (n1) {1};
        \node (n2) [right of=n1] {2};
        \node (n3) [right of=n2] {3};
        \node (n4) [right of=n3] {4};
        \node (n5) [below right of=n4] {5};

        % Cycle 
        \node (n6) [below of=n5] {6};
        \node (n7) [below left of=n6] {7};
        \node (n8) [above left of=n7] {8};
        \node (n9) [above of=n8] {9};
        \node (head) [draw=none, below of=n1] {\small Head};
        % Edges (linear part)
        \draw[->] (n1) -- (n2);
        \draw[->] (n2) -- (n3);
        \draw[->] (n3) -- (n4);
        \draw[->] (n4) -- (n5);
        % Edges (cycle)
        \draw[->] (n5) -- (n6);
        \draw[->] (n6) -- (n7);
        \draw[->] (n7) -- (n8);
        \draw[->] (n8) -- (n9);
        \draw[->] (n9) to (n4);
        \draw[->, pink] (head) to (n1);

        \node (sl) [draw=none, left of=n7]{\small Fast};
        \node (fs) [draw=none, right of = n7] {\small Slow};
        % Slow and Fast pointers meeting at node 7
        \draw[->, thick, blue] (sl) to (n7);
        \draw[->, thick, red] (fs) to (n7);
        \end{tikzpicture}

    \end{document}
</script>

<br>


Now the question, how to find the start of the cycle. For this, we need to take a detour into some elementary math to compute the distances travelled by both the pointers. 

 And let $K$ be the distance from the start of the linked list to the start of the cycle and $D$ be the distance from start of the cycle to the point where two pointers meet, and $C$ be the length of cycle. Let $M$ be the distance travelled by the $slow$ pointer when it meets with $fast$ pointer. Since the $fast$ pointer moves at $2x$, its distance will be $2M$.

For sake of simplicity, assume that both pointers iterated through the cycle multiple times before they meet. From above, distance travelled by $slow$ pointer is $\begin{equation}M =  K + D + C \times i \end{equation}$ and the distance travelled by $fast$ pointer is $\begin{equation} 2M = K + D + C \times j \end{equation}$. Since they both meet after some steps, we can equal both equations, (1) = (2),

$$K + D + C \times j = 2 \times (K + D + C \times i) $$

$$ K + D = C \times (j - 2i) $$

$\begin{equation} K + D \equiv 0 \mod C \end{equation}$

The above equation (3) tells us that $K + D$ is a multiple of $C$ (length of cycle). It means, when a pointer starts from the `head` and another pointer starts from $D$ steps away from the start of the cycle, after exactly $K + D$ steps, they both meet at a location on the cycle where the second pointer initially started. 

<br>

<script type="text/tikz">
    \begin{document}
        \usetikzlibrary{arrows.meta, positioning, decorations.pathreplacing}
        \begin{tikzpicture}[
            node distance=1.8cm,
            every node/.style={draw, circle, minimum size=1cm},
            >=Stealth
        ]
            % Linear part
            \node (n1) {1};
            \node (n2) [right of=n1] {2};
            \node (n3) [right of=n2] {3};
            \node (n4) [right of=n3] {4};
            \node (n5) [below right of=n4] {5};

            % Cycle 
            \node (n6) [below of=n5] {6};
            \node (n7) [below left of=n6] {7};
            \node (n8) [above left of=n7] {8};
            \node (n9) [above of=n8] {9};
            \node (head) [draw=none, below of=n1] {\small Head};
            % Edges (linear part)
            \draw[->, green] (n1) -- (n2);
            \draw[->, green] (n2) -- (n3);
            \draw[->, green] (n3) -- (n4);
            \draw[->, violet] (n4) -- (n5);
            % Edges (cycle)
            \draw[->, violet] (n5) -- (n6);
            \draw[->, violet] (n6) -- (n7);
            \draw[->, orange] (n7) -- (n8);
            \draw[->, orange] (n8) -- (n9);
            \draw[->, orange] (n9) to (n4);

            \draw[->, pink] (head) to (n1);

            \node (sl) [draw=none, left of=n7]{\small Fast};
            \node (fs) [draw=none, right of = n7] {\small Slow};
            % Slow and Fast pointers meeting at node 7
            \draw[->, thick, blue] (sl) to (n7);
            \draw[->, thick, red] (fs) to (n7);

            \node (inv1) [draw=none, right of=n4]{};
            \node (inv2) [draw=none, right of=n7]{};
            \node (inv3) [draw=none, above =0.05cm of n1]{};
            \node (inv4) [draw=none, above =0.05cm of n4]{};

            \draw[decorate,decoration={brace,amplitude=8pt}] 
                (inv3.north) -- (inv4.north) 
                node[draw=none, midway, yshift=20pt] {\large $K$};

            \draw[decorate,decoration={brace,amplitude=8pt}, xshift=20pt]
                (inv1.east) -- (inv2.east)
                node[draw=none, midway, right=8pt] {\large $D$};
        \end{tikzpicture}
    \end{document}
</script>

<br>

For example, let the $fast$ started at `head` and $slow$ started at Node 7 (exactly where it was stopped earlier), then after after $K + D$ steps both pointers meet again at Node 7. Now we don't know what the value of $K + D$. If we observe the diagram below, since they meet at Node 7, and $fast$ and $slow$ moves at same speed, they must meet at Node 4 and reach to Node 7 together, which indicates that they both meet after $K$ steps and travel $D$ steps together. Thus when the both pointers first meet, its the start of the cycle, which is $K$ steps from the `head`.

Below is the C++ implementation of Floyd's cycle detection algorithm. It returns the pointer to the start of the cycle, if exists. Time complexity: $O(N)$ and space complexity $O(1)$.

```C++
Node *find_cycle_start(Node *head) {
    if (!head || !head->next) return nullptr;

    Node *fast = head, *slow = head;

    while (fast && fast->next) {
        fast = fast->next->next;
        slow = slow->next;
        if (fast == slow) break;
    }

    if (!fast) return nullptr;

    // cycle exist, find its start
    fast = head;
    while (fast != slow) {
        fast = fast->next;
        slow = slow->next;
    }
    return fast;
}
```

Good Day :)