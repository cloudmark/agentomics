"use client";

import { Github, ArrowRight } from "lucide-react";
import { Copyright } from "@/components/copyright";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { TeamSection } from "@/components/team-section";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    n: "01",
    title: "Strict Validation Checkpoints",
    description:
      "Each of 7 pipeline steps is structurally and functionally validated before proceeding. Failed steps are retried automatically.",
  },
  {
    n: "02",
    title: "Iterative Experimentation",
    description:
      "An Experiment Design LLM synthesises all previous iteration summaries to generate instructions for the next run.",
  },
  {
    n: "03",
    title: "Biomedical Foundation Models",
    description:
      "Native access to ESM-2, HyenaDNA, NucleotideTransformer, RiNALMo, ChemBERTa, and MolFormerXL. Extensible via any Hugging Face model.",
  },
  {
    n: "04",
    title: "Secure & Reproducible",
    description:
      "Runs inside an isolated Docker container. Every run produces reusable training and inference scripts, a conda environment, and a PDF report.",
  },
];

const pipelineSteps = [
  "Data Exploration",
  "Data Splitting",
  "Data Representation",
  "Model Architecture",
  "Training",
  "Inference",
  "Prediction Exploration",
];

const benchmarkRows = [
  { name: "Agentomics",    pe: "75.92 ± 8.00",  dd: "34.29 ± 5.33",  rg: "60.15 ± 10.94", highlight: true },
  { name: "Biomni",        pe: "29.93 ± 11.04", dd: "32.55 ± 8.61",  rg: "30.56 ± 10.31" },
  { name: "AIDE",          pe: "35.99 ± 10.96", dd: "31.06 ± 8.88",  rg: "—" },
  { name: "MLAgentBench",  pe: "13.52 ± 9.18",  dd: "22.45 ± 5.93",  rg: "—" },
  { name: "STELLA",        pe: "15.41 ± 6.81",  dd: "12.34 ± 6.62",  rg: "—" },
  { name: "Zero-Shot LLM", pe: "6.37 ± 4.51",   dd: "10.45 ± 3.39",  rg: "21.53 ± 8.85" },
];

const regGenomicsRows = [
  { dataset: "AGO2 CLASH Hejret2023",    task: "miRNA–target interaction",      n: "8,193",   metric: "AUPRC", worst: "0.774", mean: "0.832 ± 0.054", best: "0.880", sota: "0.860", beats: true },
  { dataset: "Drosophila Enhancers Stark", task: "Enhancer vs. random genomic", n: "6,914",   metric: "ACC",   worst: "0.803", mean: "0.819 ± 0.018", best: "0.838", sota: "0.686", beats: true },
  { dataset: "Human Enhancers Cohn",     task: "Enhancer vs. size-matched random", n: "27,791", metric: "ACC", worst: "0.738", mean: "0.750 ± 0.011", best: "0.759", sota: "0.747", beats: true },
  { dataset: "Human Enhancers Ensembl",  task: "Enhancer vs. genomic background", n: "154,842", metric: "ACC", worst: "0.880", mean: "0.897 ± 0.018", best: "0.916", sota: "0.933", beats: false },
  { dataset: "Human OCR Ensembl",        task: "Open chromatin vs. random",      n: "174,756", metric: "ACC", worst: "0.754", mean: "0.790 ± 0.035", best: "0.825", sota: "0.825", beats: true },
];

// ─── Divider ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-5">
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col text-foreground">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <a href="#" className="text-sm font-semibold tracking-tight font-sans">
            Agentomics
          </a>
          <nav className="hidden items-center gap-8 text-base text-muted-foreground lg:flex font-sans">
            <a href="#pipeline"    className="hover:text-foreground transition-colors">Pipeline</a>
            <a href="#features"    className="hover:text-foreground transition-colors">Features</a>
            <a href="#get-started" className="hover:text-foreground transition-colors">Get Started</a>
            <a href="#results"     className="hover:text-foreground transition-colors">Results</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="font-sans text-xs">
              <a href="https://github.com/BioGeMT/Agentomics-ML" target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5 mr-1.5" />GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section id="hero" className="w-full pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="mx-auto max-w-5xl px-6">

            <p className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground mb-8">
              Protein Engineering · Drug Discovery · Regulatory Genomics
            </p>

            <h1 className="text-[clamp(5rem,14vw,9.5rem)] font-serif font-semibold leading-[0.88] tracking-tight mb-6">
              <span className="blur-to-focus-text">Agentomics</span>
            </h1>

            <p className="text-[clamp(1.15rem,2.4vw,2.1rem)] text-muted-foreground leading-snug mb-4 font-sans font-light whitespace-nowrap">
              Autonomous end-to-end ML experimentation for biomedical data.
            </p>
            <p className="text-muted-foreground max-w-xl leading-relaxed mb-8 font-sans">
              Provide a CSV dataset. Agentomics designs and trains models across multiple strategies, selects the best, and outputs rerunnable scripts and a PDF report.
            </p>

            <div className="border-t border-border/50 pt-6 mb-7 space-y-1.5 font-sans">
              <p className="text-muted-foreground">
                Ranks first across all three biomedical domains tested.
              </p>
              <p className="text-muted-foreground">
                Sets new state-of-the-art on{" "}
                <span className="font-semibold text-foreground">11 of 20</span>{" "}
                established benchmark datasets.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-1.5 font-mono text-xl text-muted-foreground mb-6">
              <span><span className="font-semibold text-foreground">100%</span> success rate</span>
              <span className="opacity-30">·</span>
              <span><span className="font-semibold text-foreground">20</span> benchmark datasets</span>
              <span className="opacity-30">·</span>
              <span><span className="font-semibold text-foreground">~$9.40</span> per 8-hour run</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-sans">
              <Button asChild size="lg" className="text-sm">
                <a href="#get-started">Get Started</a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-sm">
                <a href="https://www.biorxiv.org/content/10.64898/2026.01.27.702049v1" target="_blank" rel="noopener noreferrer">
                  Read the Paper <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </a>
              </Button>
            </div>

          </div>
        </section>

        {/* ── Pipeline ──────────────────────────────────────────────────────── */}
        <section id="pipeline" className="w-full py-12 md:py-16 border-t border-border/40">
          <div className="mx-auto max-w-5xl px-6">

            <SectionLabel>Pipeline</SectionLabel>
            <h2 className="text-7xl md:text-8xl font-serif mb-8">7-Step Experimentation</h2>

            <div className="overflow-x-auto -mx-6 px-6">
              <div className="flex items-start min-w-[640px] border-t border-border/40 pt-6">
                {pipelineSteps.map((step, i) => (
                  <div key={step} className="flex items-start flex-1">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-mono text-[11px] text-muted-foreground/60 mb-2 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium leading-tight pr-3">{step}</span>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <div className="mt-3 mx-1 w-6 h-px bg-border/50 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <p className="font-mono text-base text-muted-foreground mt-5">
                Iterative: after each run the Experiment Design LLM reads the full summary and generates the next strategy.
              </p>
            </div>

          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section id="features" className="w-full py-12 md:py-16 border-t border-border/40">
          <div className="mx-auto max-w-5xl px-6">

            <SectionLabel>System Design</SectionLabel>
            <h2 className="text-7xl md:text-8xl font-serif mb-10">Key Properties</h2>

            <div className="grid md:grid-cols-2 gap-x-20 gap-y-12 font-sans">
              {features.map((f) => (
                <div key={f.title} className="border-t border-border/40 pt-6">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-sm text-muted-foreground/60">{f.n}</span>
                    <h3 className="font-serif text-3xl font-semibold">{f.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-8">{f.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Get Started ───────────────────────────────────────────────────── */}
        <section id="get-started" className="w-full py-12 md:py-16 border-t border-border/40">
          <div className="mx-auto max-w-5xl px-6">

            <SectionLabel>Installation</SectionLabel>
            <h2 className="text-7xl md:text-8xl font-serif mb-6">Get Started</h2>

            <div className="space-y-8 font-sans">
              <div className="space-y-5 text-xl text-muted-foreground max-w-2xl">
                {[
                  { n: "1", text: <>Clone the repository and copy <code className="font-mono text-base bg-muted px-1.5 py-0.5">.env.example</code> to <code className="font-mono text-base bg-muted px-1.5 py-0.5">.env</code>, then add your API key.</> },
                  { n: "2", text: <>Run <code className="font-mono text-base bg-muted px-1.5 py-0.5">./run.sh</code>. It builds the Docker image and guides you through configuring a run.</> },
                  { n: "3", text: "Provide your CSV dataset with a label column and an optional plain-text description of the task." },
                  { n: "4", text: <>Results are written to <code className="font-mono text-base bg-muted px-1.5 py-0.5">outputs/&lt;agent_id&gt;/</code> — rerunnable scripts, model weights, a conda environment, and a PDF report.</> },
                ].map((item) => (
                  <div key={item.n} className="flex gap-6 items-baseline">
                    <span className="font-mono text-base text-muted-foreground/60 shrink-0 w-4">{item.n}</span>
                    <p className="leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/40 pt-7 max-w-2xl font-mono text-base">
                <div className="grid grid-cols-[120px_1fr] gap-y-2">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground pt-0.5">Input</span>
                  <div className="space-y-2">
                    <p className="text-foreground">CSV with a label column</p>
                    <p className="text-muted-foreground">Task description <span className="text-muted-foreground/60 text-xs">optional</span></p>
                    <p className="text-muted-foreground">Held-out test CSV <span className="text-muted-foreground/60 text-xs">optional</span></p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground pt-0.5 mt-6">Output</span>
                  <div className="space-y-2 mt-6">
                    <p><span className="text-foreground">train.sh</span> <span className="text-muted-foreground">· retrain on any compatible dataset</span></p>
                    <p><span className="text-foreground">inference.sh</span> <span className="text-muted-foreground">· unified prediction interface</span></p>
                    <p><span className="text-foreground">environment.yml</span> <span className="text-muted-foreground">· conda specification</span></p>
                    <p><span className="text-foreground">model/</span> <span className="text-muted-foreground">· weights, encoders, preprocessors</span></p>
                    <p><span className="text-foreground">report.pdf</span> <span className="text-muted-foreground">· strategy, train / val / test metrics</span></p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground/60 mt-6">
                  Recommended: GPT-5.1-Codex-Max · 8-hour runs · NVIDIA RTX A4000
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Results ───────────────────────────────────────────────────────── */}
        <section id="results" className="w-full py-12 md:py-16 border-t border-border/40">
          <div className="mx-auto max-w-5xl px-6 space-y-12">

            <div className="font-sans">
              <SectionLabel>Results</SectionLabel>
              <h2 className="text-7xl md:text-8xl font-serif mb-6">Benchmark Evaluation</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Evaluated across 20 benchmark datasets from Protein Engineering (N=6),
                Drug Discovery (N=9), and Regulatory Genomics (N=5) using the BioML-bench
                framework. Agentomics outperformed all other benchmarked agents in all domains.
              </p>
            </div>

            {/* Table 1 */}
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground mb-5">
                Table 1 — Mean leaderboard placement ± SEM (% of human solutions outperformed)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-base border-collapse font-sans">
                  <thead>
                    <tr className="border-b-2 border-border/60">
                      <th className="text-left py-3 pr-10 font-mono text-sm text-muted-foreground uppercase tracking-wider font-medium">Agent</th>
                      <th className="text-right py-3 px-5 font-mono text-sm text-muted-foreground uppercase tracking-wider font-medium">Protein Eng.</th>
                      <th className="text-right py-3 px-5 font-mono text-sm text-muted-foreground uppercase tracking-wider font-medium">Drug Discovery</th>
                      <th className="text-right py-3 px-5 font-mono text-sm text-muted-foreground uppercase tracking-wider font-medium">Reg. Genomics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarkRows.map((row, i) => (
                      <tr
                        key={row.name}
                        className={cn(
                          "border-b border-border/30",
                          row.highlight && "font-semibold",
                          i === 0 && "border-b border-border/50"
                        )}
                      >
                        <td className="py-3 pr-10">{row.name}</td>
                        <td className={cn("py-3 px-5 text-right font-mono text-base", row.highlight ? "text-foreground" : "text-muted-foreground")}>{row.pe}</td>
                        <td className={cn("py-3 px-5 text-right font-mono text-base", row.highlight ? "text-foreground" : "text-muted-foreground")}>{row.dd}</td>
                        <td className={cn("py-3 px-5 text-right font-mono text-base", row.highlight ? "text-foreground" : "text-muted-foreground")}>{row.rg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] font-mono text-muted-foreground mt-3">
                  Leaderboard % computed from successful runs only. All runs: GPT-5.1-Codex-Max · 8 h · NVIDIA RTX A4000 · 48 CPU cores.
                </p>
              </div>
            </div>

            {/* Table 2 */}
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground mb-5">
                Table 2 — Regulatory Genomics · worst / mean ± SD / best of 3 replicates vs. human SoTA
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-base border-collapse font-sans">
                  <thead>
                    <tr className="border-b-2 border-border/60">
                      {[
                        { label: "Dataset",     align: "left"  },
                        { label: "N",           align: "right" },
                        { label: "Metric",      align: "right" },
                        { label: "Worst",       align: "right" },
                        { label: "Mean ± SD",   align: "right" },
                        { label: "Best",        align: "right" },
                        { label: "Human SoTA",  align: "right" },
                      ].map((col) => (
                        <th key={col.label}
                          className={cn(
                            "py-3 px-3 font-mono text-sm text-muted-foreground uppercase tracking-wider font-medium",
                            col.align === "right" ? "text-right" : "text-left"
                          )}
                        >{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {regGenomicsRows.map((row) => (
                      <tr key={row.dataset} className="border-b border-border/30">
                        <td className="py-3 px-3">
                          <div className="font-medium text-sm">{row.dataset}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{row.task}</div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-base text-muted-foreground">{row.n}</td>
                        <td className="py-3 px-3 text-right font-mono text-base text-muted-foreground">{row.metric}</td>
                        <td className="py-3 px-3 text-right font-mono text-base text-muted-foreground">{row.worst}</td>
                        <td className="py-3 px-3 text-right font-mono text-base text-muted-foreground">{row.mean}</td>
                        <td className={cn(
                          "py-3 px-3 text-right font-mono text-base",
                          row.beats ? "font-bold text-foreground" : "text-muted-foreground"
                        )}>
                          {row.best}{row.beats && <span className="ml-0.5 text-[10px]">↑</span>}
                        </td>
                        <td className={cn(
                          "py-3 px-3 text-right font-mono text-base",
                          !row.beats ? "font-bold text-foreground" : "text-muted-foreground"
                        )}>{row.sota}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] font-mono text-muted-foreground mt-3">
                  ↑ Agentomics best-of-3 exceeds human state-of-the-art. Values are raw metric scores.
                </p>
              </div>
            </div>

          </div>
        </section>

        <TeamSection />
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="z-10 border-t border-border/40 bg-background/90">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 font-sans">
          <Copyright />
          <a
            href="https://github.com/BioGeMT/Agentomics-ML"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </footer>

    </div>
  );
}
