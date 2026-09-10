"use client";

import Link from "next/link";
import { LogoMark } from "../components/Logo";

const STATS = [
  { value: "12,847", label: "Fuzz Runs", suffix: "+" },
  { value: "340", label: "Contracts Tested", suffix: "+" },
  { value: "1,206", label: "Crashes Found", suffix: "" },
  { value: "99.7", label: "Uptime", suffix: "%" },
];

const STEPS = [
  {
    number: "01",
    title: "Point at your contract",
    body: "Drop in a WASM file or paste a Stellar contract ID. CrashLab reads the exported functions and builds a mutation targets list automatically.",
    accent: "#0A66C2",
  },
  {
    number: "02",
    title: "Configure the fuzz campaign",
    body: "Pick which functions to stress, set mutation depth, resource limits, and how long to run. One click or full control — your call.",
    accent: "#0A66C2",
  },
  {
    number: "03",
    title: "CrashLab mutates and executes",
    body: "The fuzzer generates thousands of mutated inputs, sends them to your contract on a local or testnet Stellar node, and watches for panics, OOB reads, and resource overflows.",
    accent: "#0A66C2",
  },
  {
    number: "04",
    title: "Triage the failures",
    body: "Crashes cluster by signature. The triage board groups identical failures, shows the exact call sequence that triggered each one, and links to the relevant ledger changes.",
    accent: "#CC1016",
  },
  {
    number: "05",
    title: "Ship with confidence",
    body: "Export reproduction snippets, open GitHub issues from the dashboard, or feed failures back into CI. Every crash has a replayable proof.",
    accent: "#057642",
  },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.25-11.396c.251.023.501.05.75.082M12 21a8.966 8.966 0 0 0 5.982-2.275M12 21a8.966 8.966 0 0 1-5.982-2.275M12 21c1.351 0 2.639-.15 3.862-.425m-7.724 0A8.966 8.966 0 0 1 6.018 18.725M12 3c-1.351 0-2.639.15-3.862.425m7.724 0A8.966 8.966 0 0 0 17.982 5.275" />
      </svg>
    ),
    title: "Automated Mutation Fuzzing",
    body: "Generates thousands of mutated contract inputs. No manual test-writing needed — the fuzzer discovers edge cases on its own.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "Failure Clustering",
    body: "Identical crashes group by signature. Triage hundreds of failures in minutes, not days.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Replay & Reproduce",
    body: "Every crash ships with a deterministic call sequence. Replay it locally or feed it into CI to verify the fix.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Analytics & Heatmaps",
    body: "Performance heatmaps, crash trend timelines, and anomaly detection give you the full picture at a glance.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
      </svg>
    ),
    title: "CI/CD Integration",
    body: "GitHub Actions, webhooks, and API tokens let you wire CrashLab into your deployment pipeline. Fail the build before the crash ships.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Soroban-Native Security",
    body: "Built from the ground up for Stellar's Soroban VM. Understands resource fees, auth trees, and contract storage intrinsics.",
  },
];

function StatPill({ stat }: { stat: (typeof STATS)[number] }) {
  return (
    <div className="flex flex-col items-center px-6 py-3">
      <span
        className="text-2xl sm:text-3xl font-extrabold tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {stat.value}
        <span className="text-lg" style={{ color: "#0A66C2" }}>
          {stat.suffix}
        </span>
      </span>
      <span
        className="text-xs font-medium tracking-wide uppercase mt-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {stat.label}
      </span>
    </div>
  );
}

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  return (
    <div className="relative flex gap-5 sm:gap-8">
      {/* Timeline line */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: step.accent }}
        >
          {step.number}
        </div>
        {index < STEPS.length - 1 && (
          <div
            className="w-px flex-1 my-2"
            style={{ backgroundColor: "var(--border-color)" }}
          />
        )}
      </div>
      {/* Content */}
      <div className="pb-10">
        <h3
          className="text-base sm:text-lg font-bold mb-1.5"
          style={{ color: "var(--text-primary)" }}
        >
          {step.title}
        </h3>
        <p
          className="text-sm sm:text-[15px] leading-relaxed max-w-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {step.body}
        </p>
      </div>
    </div>
  );
}

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  return (
    <div
      className="rounded-xl p-6 transition-all duration-200 hover:shadow-lg group"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border-color)",
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200"
        style={{
          backgroundColor: "var(--highlight-bg)",
          color: "#0A66C2",
        }}
      >
        {feature.icon}
      </div>
      <h3
        className="text-sm font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {feature.title}
      </h3>
      <p
        className="text-[13px] leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {feature.body}
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        marginTop: "-56px",
        paddingTop: "56px",
      }}
      className="lg:mt-[-68px] lg:pt-[68px]"
    >
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(10,102,194,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 text-center">
          {/* LogoMark */}
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in-up">
            <LogoMark size={72} />
          </div>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-5 animate-fade-in-up animation-delay-100"
            style={{ color: "var(--text-primary)" }}
          >
            Fuzz your Soroban
            <br />
            contracts before they
            <br />
            <span style={{ color: "#0A66C2" }}>ship with holes.</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-200"
            style={{ color: "var(--text-secondary)" }}
          >
            Automated mutation testing for Soroban smart contracts on Stellar.
            Find crashes, resource overflows, and auth bypasses before your users do.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <Link
              href="/dashboard"
              prefetch
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: "#0A66C2" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
              Open App
            </Link>
            <a
              href="https://github.com/SorobanCrashLab/soroban-crashlab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--surface)",
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Source
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────── */}
      <section
        className="border-y"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x sm:divide-x" style={{ borderColor: "var(--border-color)" }}>
            {STATS.map((stat) => (
              <StatPill key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#0A66C2" }}
          >
            How it works
          </p>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            From WASM to triaged crash
            <br className="hidden sm:block" />
            in five steps.
          </h2>
        </div>

        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#0A66C2" }}
            >
              Features
            </p>
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Everything you need to find
              <br className="hidden sm:block" />
              crashes before your users do.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-20 sm:py-28 text-center">
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Ready to break your contracts?
        </h2>
        <p
          className="text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          CrashLab is free and open source. Point it at a contract and see what
          the fuzzer finds.
        </p>
        <Link
          href="/dashboard"
          prefetch
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
          style={{ backgroundColor: "#0A66C2" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
          Open App
        </Link>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer
        className="border-t py-10"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark size={24} />
              <span
                className="text-sm font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                CrashLab
              </span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                for Soroban
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-secondary)" }}>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: "#057642" }}
                />
                Stellar Testnet
              </span>
              <span>·</span>
              <span>Soroban Runtime</span>
              <span>·</span>
              <a
                href="https://github.com/SorobanCrashLab/soroban-crashlab"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "#0A66C2" }}
              >
                GitHub
              </a>
            </div>
          </div>
          <div
            className="text-center text-[11px] mt-6"
            style={{ color: "var(--text-secondary)" }}
          >
            Powered by Stellar · Soroban · Rust · WebAssembly
          </div>
        </div>
      </footer>
    </div>
  );
}
