---
title: "Where does your photo actually go?"
hook: "You press send. It arrives on the other side of the world before you put your phone down."
category: networks
difficulty: starter
summary: >-
  Almost nothing you send travels through the sky. It travels as light, through
  glass cables lying on the floor of the ocean — and it gets there in about the
  time it takes to blink.
layers:
  - question: "WHERE DOES IT START?"
    title: "Your phone lets go"
    description: "The photo becomes a stream of numbers and leaves over Wi-Fi or mobile signal — the only genuinely wireless part of the journey."
    symbol: "((·))"
  - question: "WHERE DOES IT GO FIRST?"
    title: "The nearest tower"
    description: "That signal travels a few hundred metres at most, then meets a wire. From here on, almost everything is physical."
    symbol: "▲"
  - question: "SO NOT SPACE?"
    title: "Almost never a satellite"
    description: "Satellites sit far away, so the round trip adds delay. They are used where cable cannot reach — ships, remote regions, disaster zones."
    symbol: "✕"
  - question: "WHERE THEN?"
    title: "Into the ocean"
    description: "Your data reaches a landing station on the coast and enters a cable about as thick as a garden hose, running along the seabed."
    symbol: "≈"
  - question: "WHAT IS INSIDE?"
    title: "Glass, not copper"
    description: "Strands of glass thinner than a human hair. Your photo becomes pulses of light flickering on and off billions of times a second."
    symbol: "|"
  - question: "HOW FAST?"
    title: "About two-thirds of light speed"
    description: "London to New York takes roughly 60 milliseconds — faster than you can consciously notice the delay."
    symbol: "»"
  - question: "WHAT IF IT BREAKS?"
    title: "Ships go and fix it"
    description: "Cables get cut by anchors, trawlers and earthquakes. Repair ships haul them up from the seabed and splice them back together."
    symbol: "⚓"
decision:
  prompt: "A cable between two continents is cut this morning. What happens to your messages?"
  options:
    - label: "Nothing — you don’t notice"
      outcome: "Usually right. Traffic reroutes through other cables in milliseconds. Most outages never reach you."
      isRecommended: true
    - label: "Everything stops"
      outcome: "Rarely. It takes several cables failing at once — which is why countries with only one or two cables are genuinely fragile."
    - label: "It switches to satellite"
      outcome: "Only as a last resort. Satellite capacity is a small fraction of what cables carry, so it cannot absorb the load."
scene: photo-journey
featured:
  headline: "Your photo didn’t fly through the sky."
  teaser: "It dived into the ocean and crossed the seabed as a pulse of light — before you put your phone down."
relatedTopics:
  - ai-agent-permissions
sources:
  - label: "TeleGeography — Submarine Cable Map"
    url: "https://www.submarinecablemap.com/"
  - label: "International Cable Protection Committee"
    url: "https://www.iscpc.org/"
publishedDate: 2026-08-15
status: published
---

## The picture in our heads is wrong

Most of us imagine the internet as something in the air — a cloud, a signal,
something floating above us. It is a useful picture and it is almost entirely
wrong.

The wireless part of your photo's journey is the shortest part: from your hand
to the nearest tower or router, a few hundred metres. Everything after that is
physical infrastructure — buried cable, coastal landing stations, and over a
million kilometres of fibre lying on the seabed.

## Why the ocean and not space

Distance costs time. A satellite in geostationary orbit sits about 36,000 km
up, so the signal has to make a 72,000 km round trip before anything comes
back. A cable across the Atlantic is roughly 6,000 km. Light in glass is
slightly slower than light in a vacuum, and it still wins comfortably.

Newer satellite constellations orbit much closer and narrow that gap, which is
why they work well for places cable cannot reach. They do not replace cables —
the total capacity is not remotely comparable.

## The part worth remembering

When something feels instant, it usually is not magic. It is infrastructure
that somebody built, that somebody maintains, and that can be cut by a ship's
anchor on an ordinary Tuesday.
