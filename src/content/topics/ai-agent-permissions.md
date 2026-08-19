---
title: "What should your AI agent be allowed to do?"
hook: "Every day you open email, files, calendars and payments. They all recognize the same person: you."
category: ai-agents
difficulty: starter
scene: agent-stage
summary: >-
  AI agents act on your behalf inside the same apps you already trust. Before
  they get power, someone has to decide who they are, what they may do, and
  how to stop them.
layers:
  - question: "WHO IS IT?"
    title: "Identity"
    description: "Give the actor a distinct identity before deciding what it can reach."
    symbol: "ID"
  - question: "CAN IT PROVE THAT?"
    title: "Authentication"
    description: "Verify that the actor presenting the identity is really the one we expect."
    symbol: "✓"
  - question: "WHAT MAY IT DO?"
    title: "Authorization"
    description: "Decide which actions this identity is actually allowed to perform."
    symbol: "→"
  - question: "HOW MUCH IS ENOUGH?"
    title: "Least privilege"
    description: "Give only the minimum access needed for the job — no more."
    symbol: "−"
  - question: "WHERE MAY IT GO?"
    title: "Network access"
    description: "Limit which systems and paths the actor is allowed to reach."
    symbol: "⌁"
  - question: "WHAT DID IT DO?"
    title: "Monitoring"
    description: "Keep evidence of actions so unusual behaviour can be seen."
    symbol: "◎"
  - question: "CAN WE STOP IT?"
    title: "Revocation"
    description: "Remove access quickly when the job, identity, or risk changes."
    symbol: "×"
decision:
  prompt: "Your AI agent needs to handle a £42,000 invoice. What should it be allowed to do on its own?"
  options:
    - label: "Read the invoice"
      outcome: "Safe. It only sees information — the supplier, amount, and payment details."
      isRecommended: true
    - label: "Prepare the payment"
      outcome: "Still safe. It creates a draft for a human to review before anything moves."
      isRecommended: true
    - label: "Send the payment"
      outcome: "This is real-world power, not information. One unreviewed action moves £42,000."
relatedTopics:
  - zero-trust-identity
sources:
  - label: "NIST Zero Trust Architecture (SP 800-207)"
    url: "https://csrc.nist.gov/pubs/sp/800/207/final"
publishedDate: 2026-08-01
status: published
---

## The core beneath

The actor changed — from a person clicking "send" to an AI agent acting on your
behalf — but the question didn't. Before something gets power, you still have
to decide who it is, what it may do, and how to stop it if it goes wrong.

This is part of what security teams call **Zero Trust**: never assume access
is safe just because a request came from inside a familiar app. Every action
gets checked against identity, authorization, and the smallest privilege that
gets the job done.

The same seven layers apply whether the actor is a person, a service account,
or an AI agent. What changes is how fast those actors can now act — which is
exactly why the boundary matters more, not less.
