import { useState } from "react";
import EverydayScene from "./EverydayScene";
import LocationScene from "./LocationScene";

export default function HeroExperience() {
  const [stage, setStage] = useState("idle");

  const resetExperience = () => {
    setStage("idle");
  };

  return (
    <section
      className={`hero-experience hero-experience--${stage}`}
      data-stage={stage}
    >
      <div className="hero-experience__inner">
        <div className="hero-experience__copy">
          {stage === "idle" && (
            <div className="hero-experience__reveal">
              <h1>
                Understand the world that's{" "}
                <span className="hero-experience__accent">
                  arriving.
                </span>
              </h1>

              <p className="hero-experience__intro">
                <span>Some of it is already around us.</span>
                <span>Some of it is just beginning.</span>
              </p>

              <p className="hero-experience__question">
                Let's see what's actually happening.
              </p>

              <button
                className="hero-experience__cta"
                type="button"
                onClick={() => setStage("question")}
              >
                Take a look
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}

          {stage === "question" && (
            <div className="hero-experience__reveal">
              <button
                className="hero-experience__back"
                type="button"
                onClick={resetExperience}
              >
                ← Back
              </button>

              <p className="hero-experience__eyebrow">
                There's more happening around you than you realize.
              </p>

              <h2 className="hero-experience__reveal-title">
                How does your phone know
                <br />
                <span className="hero-experience__reveal-accent">
                  you're here?
                </span>
              </h2>

              <p className="hero-experience__reveal-copy">
                You see that blue dot all the time.
                <br />
                Let's look underneath it.
              </p>

              <button
                className="hero-experience__reveal-cta"
                type="button"
                onClick={() => setStage("signal")}
              >
                Show me
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}

          {stage === "signal" && (
            <div className="hero-experience__reveal">
              <button
                className="hero-experience__back"
                type="button"
                onClick={() => setStage("question")}
              >
                ← Back
              </button>

              <p className="hero-experience__eyebrow">
                First clue.
              </p>

              <h2 className="hero-experience__reveal-title">
                It starts
                <br />
                <span className="hero-experience__reveal-accent">
                  above you.
                </span>
              </h2>

              <p className="hero-experience__reveal-copy">
                Satellites are constantly sending signals toward Earth.
              </p>

              <button
                className="hero-experience__reveal-cta"
                type="button"
              >
                Keep going
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>

        <div className="hero-experience__visual">
          {stage === "idle" ? (
            <EverydayScene />
          ) : (
            <LocationScene stage={stage} />
          )}
        </div>
      </div>
    </section>
  );
}