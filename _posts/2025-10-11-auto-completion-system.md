---
layout: post
title: Autocompletion using Trie
date: 2025-10-11 13:05:10
description: a trivial autocompletion using Trie
tags: trie string
categories: Trees LLD
featured: True
---

In my [previous post](../trie), I introduced the Trie data structure, its basic operations, and how it allows efficient prefix search. Now, I'll take it one step further and show how Trie can be used to build an autocomplete system.

Instead of building a feature-rich autocomplete system, I used the specifications from [Leetcode 642](https://leetcode.com/problems/design-search-autocomplete-system/description/) for a trivial autocomplete system.

I just noticed [Leetcode 642](https://leetcode.com/problems/design-search-autocomplete-system/description/) is behind the premium paywall. Below is the problem description. 

> Design a search autocomplete system for a search engine. Users may input a sentence (atleast one word end with a special character `#`).
> You are given a string array `sentences` and an integer array `times` both of length `n` where `sentences[i]` is a previously typed sentence and `times[i]` is the corresponding number of times the sentence was typed. For each input character except `#`, return the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed.
> Here are the specific rules:
>    * The hot degree for a sentence is defined as the number of times a user typed the exactly same sentence before.
>    * The returned top 3 hot sentences should be sorted by hot degree (The first is the hottest one). If several sentences have the same hot degree, use ASCII-code order (smaller one appears first).
>    * If less than 3 hot sentences exist, return as many as you can.
>    * When the input is a special character, it means the sentence ends, and in this case, you need to return an empty list.
>Two functions in the class:
> 1. `AutocompleteSystem(String[] sentences, int[] times)`: Initializes the object with the `sentences` and `times` arrays.
> 2. `List<String> input(char c)` This indicates that the user typed the character `c`. Add this character to the already inputted string.
>    * Returns the empty array if `c == '#'` and stores the inputted sentence in the sytem.
>    * Returns the top 3 historical hot sentence that have the same prefix as the part of sentence already typed. If it has fewer than 3 matches, return them all.

I think the input specification is bit confusing. Below is an example.

Given `sentences[] = {"i love cake", "island", "indra", "i like leetcode", "i like biryani"}` and `times[] = {3, 2, 4, 1, 4}`. 

If the user first types "i", then the system should return `["i like biryani", "i like leetcode", "i love cake"]`. The result should be sorted by its hot value and then by ascii value upon tie. Later, if user types "p", the input string becomes "ip", then the system should return `[]`, as no string has "ip" as its prefix. Then, if the user types "#", the system should assume that input is completed and insert this string into the tree.

## Intuition

Every sentence has a score (hot value) associated with it. This is used to rank the qualified sentences. Here, the term _qualified_ means that a string has matching prefix. So, store the top 3 qualified sentences in the Trie node.  

Maintain a string `s` with already inputted characters. On input `c`, append it to `s`. Start traversing the tree from the root with `s`. At the end of traversal, select the node and return top 3 sentences from it. If `#` is inputted, add `s` to the tree with its score as 1 and reset `s`.

## Implementation

The implementation _slightly_ seperates the Trie logic from the autocomplete system. 

The `Node` class stores the top 3 sentences for its corresponding prefix. Instead of storing the actual sentences, it stores the sentence Id. This Id can be used to retrieve the actual sentence from the global pool.

The `Trie` class provides two functions `add` and `search` (similar to previous implementation).

1. `add` The only difference from previous is during creating a new node, we add this sentence to the node and rebuild the top 3 sentences. If node already exists, add this sentence to it and rebuild its top 3 sentences. 

2. `search`: similar to  Instead of returning a boolean value, return the top 3 sentences of that node.


```c++
#include <vector>
#include <string>

using namespace std;

class Node{
public:
    vector<int> top3;
    Node *childs[27] = {nullptr}; // last index is for ' '.
    Node() = default;
};

class Trie{
public:
    Node *root;
    Trie(){ root = new Node(); }

    /**
        Adds the given sentence by its Id to the tree.
        @param sentences is a list of global sentences.
        @param times is the hot scores of corresponding sentences.
    */
    void add(const vector<string>& sentences, const vector<int>& times, int i){

        const string& word = sentences[i];
        int hotness = times[i];

        auto index = [](char a) { return (a == ' ') ? 26 : (a-'a'); };

        Node *current = root;
        for (char c : word){
            if (!current->childs[index(c)])
                current->childs[index(c)] = new Node();
            current = current->childs[index(c)];

            // add this sentence to top 3 list if not already present.
            auto& top3 = current->top3;
            if (auto pos = find(top3.begin(), top3.end(), i); pos == top3.end()) 
                top3.push_back(i);
            // sort the top 3 based on its scores.
            std::sort(top3.begin(), top3.end(), [&sentences, &times](int a, int b) {
                return (times[a] == times[b]) ? (sentences[a] < sentences[b]) : (times[a] > times[b]);
            });
            // keep only top 3.
            if (top3.size() > 3) top3.pop_back();
        }
    }

    /**
        returns the top 3 sentences that has given word as their prefix.
    */
    vector<string> search(const string& word, const vector<string>& sentences) const {
        const auto *current = root;
        auto index = [](char a){ return (a == ' ') ? 26 : (a - 'a'); };

        for (char c : word){
            int pos = index(c);
            if (!(current->childs[pos])) // if prefix not exist, return empty list.
                return {};
            current = current->childs[pos];
        }
        vector<string> result;
        for (int p : current->top3) result.push_back(sentences[p]);
        return result;
    }
};
class AutocompleteSystem {
    vector<string> sentences;
    unordered_map<string, int> mappings; // maps a sentence to a global Id.
    vector<int> times;
    Trie trie;
    string curr_word; //current input sentence.
public:
    AutocompleteSystem(vector<string>& sentences_, vector<int>& times_)
        : sentences{std::move(sentences_)}, times{std::move(times_)}, 
        trie{}, curr_word{""} {

        for (int i = 0; i < sentences.size(); i++)
            mappings.insert({sentences[i], i});

        for (int i = 0; i < sentences.size(); i++)
            trie.add(sentences, times, i);
    }
    
    vector<string> input(char c) {
        if (c == '#') {
            // if input sentence is already present, then increment its score by 1.
            auto pos = mappings.find(curr_word);
            int index = -1;
            if (pos == mappings.end()){
                sentences.push_back(curr_word);
                index = sentences.size()-1;
                times.push_back(0);
                mappings.insert({curr_word, index});
            }
            else index = pos->second;
            times[index]++;
            // update the trie with the new score.
            trie.add(sentences, times, index);
            curr_word.clear();
            return {};
        }
        // else return prefix matches.
        curr_word += c;
        return trie.search(curr_word, sentences);
    }
};
```

<sub><sup>This code can be pasted in the leetcode submission. ( ͡° ͜ʖ ͡°) </sup></sub>

Good day. o7
