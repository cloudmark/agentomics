"use client";

import {
  BrainCircuit,
  Github,
  Lock,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Copyright } from "@/components/copyright";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AsciinemaPlayer } from "@/components/asciinema-player";
import { DatasetChart } from "@/components/dataset-chart";
import { ThemeToggle } from "@/components/theme-toggle";
import { TeamSection } from "@/components/team-section";

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Secure by Default",
    description:
      "Every run executes inside an isolated Docker container. Code is sandboxed, dependencies are pinned, and nothing touches your host environment.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Biomedical Foundation Models",
    description:
      "Built-in support for ESM-2, HyenaDNA, NucleotideTransformer, RiNALMo, ChemBERTa and MolFormerXL. Any Hugging Face model can be added.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Verified Results, Not Hallucinated Ones",
    description:
      "Every step must produce working code before the next begins. Agentomics always builds on validated, executable outputs so the metrics it reports reflect models that actually ran.",
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Reproducible Output",
    description:
      "Every completed run includes reusable training and inference scripts, a conda environment, and a PDF report.",
  },
];

const pipelineSteps = [
  { step: "1", title: "Data Exploration", description: "The agent reads your dataset, profiles its features, and builds an understanding of the task before writing any code." },
  { step: "2", title: "Data Splitting", description: "A train/validation split is produced, reused across iterations — to ensure fair, consistent evaluation throughout." },
  { step: "3", title: "Data Representation", description: "Raw inputs are transformed into model-ready tensors or feature matrices. Representations are reassessed each iteration." },
  { step: "4", title: "Model Architecture", description: "A new model is designed from scratch, PyTorch, sklearn, or a biomedical foundation model with a different strategy each iteration." },
  { step: "5", title: "Training", description: "The model is trained with the chosen architecture and hyperparameters. Failed runs are retried automatically." },
  { step: "6", title: "Inference", description: "The trained model is evaluated on the held-out validation set and predictions are written to disk." },
  { step: "7", title: "Prediction Exploration", description: "Results are analysed, feedback is generated, and the loop restarts and each iteration tries a better strategy until the best is found." },
];

const proteinData = [
  { name: "Agentomics", value: 75.92 },
  { name: "AIDE", value: 35.99 },
  { name: "Biomni", value: 29.93 },
  { name: "STELLA", value: 15.41 },
  { name: "MLAgentBench", value: 13.52 },
  { name: "Zero-Shot", value: 6.37 },
];

const drugData = [
  { name: "Agentomics", value: 34.29 },
  { name: "Biomni", value: 32.55 },
  { name: "AIDE", value: 31.06 },
  { name: "MLAgentBench", value: 22.45 },
  { name: "STELLA", value: 12.34 },
  { name: "Zero-Shot", value: 10.45 },
];

const genomicsData = [
  { name: "Agentomics", value: 60.15 },
  { name: "Biomni", value: 30.56 },
  { name: "Zero-Shot", value: 21.53 },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-transparent text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="#" className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80">
            <span className="font-bold text-lg tracking-tight">Agentomics</span>
          </a>
          <nav className="hidden items-center space-x-8 text-sm font-medium lg:flex">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#get-started", label: "Get Started" },
              { href: "#case-study", label: "Case Study" },
              { href: "#results", label: "Results" },
              { href: "#team", label: "Team" },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="transition-all duration-200 hover:text-primary hover:scale-105 whitespace-nowrap relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeToggle />
            <Button asChild>
              <a href="https://github.com/BioGeMT/Agentomics-ML" target="_blank" rel="noopener noreferrer">
                <Github />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="z-10 flex-1">
        {/* Hero */}
        <section id="hero" className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="container mx-auto flex flex-col items-center px-4 text-center">
            <div className="relative w-full flex items-center justify-center">
              <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-center">
                <span className="blur-to-focus-text">Agentomics</span>
              </h1>
            </div>
            <p className="mx-auto mt-6 max-w-[700px] text-2xl text-muted-foreground">
              Autonomous ML experimentation for biomedical data.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="text-lg">
                <a href="#get-started">Get Started</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <a href="https://arxiv.org/abs/2506.05542" target="_blank" rel="noopener noreferrer">
                  Read the Paper
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Value prop */}
        <section id="value-prop" className="w-full animate-fade-in-up pt-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                From data to trained model, fully automated.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Provide a dataset with a label column. Agentomics designs and trains models across
                multiple strategies, picks the best one, and gives you working scripts and a report.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { stat: "100%", label: "Pipeline success rate" },
                { stat: "Peer-reviewed", label: "Published research" },
                { stat: "~$9.40", label: "Per run" },
                { stat: "#1", label: "Across all domains tested" },
              ].map(({ stat, label }) => (
                <Card key={label} className="group relative overflow-hidden border border-primary/20 bg-card/90 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <span className="text-3xl font-extrabold text-primary text-center">{stat}</span>
                    <span className="mt-1 text-center text-sm text-muted-foreground">{label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="w-full animate-fade-in-up py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                What sets it apart
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Agentomics is not a hyperparameter tuner. It generates code from scratch for each
                dataset, selects among competing strategies, and runs the full experiment
                inside a sandboxed environment.
              </p>
            </div>
            <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
              {features.map((f) => (
                <Card key={f.title} className="group relative overflow-hidden border border-primary/20 bg-card/90 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    {f.icon}
                    <CardTitle className="text-xl">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{f.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
                The 7-step pipeline
              </h3>
              <div className="overflow-x-auto">
                <div className="flex items-start min-w-[600px] border-t border-primary/20 pt-6 gap-0">
                  {pipelineSteps.map((s, i) => (
                    <div key={s.step} className="flex items-start flex-1">
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-mono text-xs text-primary/50 mb-2">{s.step.padStart(2, "0")}</span>
                        <span className="text-xl font-bold leading-tight pr-4 text-foreground">{s.title}</span>
                      </div>
                      {i < pipelineSteps.length - 1 && (
                        <div className="mt-3 mx-1 w-5 h-px bg-primary/20 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Runs iteratively. Each cycle tries a new strategy until the best model is found.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section id="get-started" className="w-full animate-fade-in-up py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Get Started
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Install via pip and run your first experiment in minutes.
                Requires Docker and an API key for the LLM provider of your choice.
              </p>
            </div>
            <div className="mx-auto max-w-2xl space-y-8">
              <Card className="group relative overflow-hidden border border-primary/20 bg-card/90 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
                <CardContent className="p-6">
                  <pre className="overflow-x-auto rounded-md bg-muted/60 p-4 text-sm font-mono">
                    <code className="text-primary">pip install agentomics-ml</code>
                  </pre>
                </CardContent>
              </Card>
              <div className="space-y-4">
                {[
                  { n: "1", title: "Set your API key", body: 'Export your LLM provider key, e.g. export OPENAI_API_KEY="sk-…"' },
                  { n: "2", title: "Point it at your data", body: "Pass any CSV with a label column. Agentomics handles the rest." },
                  { n: "3", title: "Collect your outputs", body: "Training script, inference script, conda environment, and a PDF report. All written to the output directory." },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-base">
                      {n}
                    </div>
                    <p className="text-lg">
                      <span className="font-semibold">{title}: </span>
                      <span className="text-muted-foreground">{body}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section id="case-study" className="w-full animate-fade-in-up py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Case Study: Breast Cancer Classification
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Watch Agentomics train a classification model on the Breast Cancer Wisconsin
                dataset from scratch. The agent explores the data, selects a strategy, trains,
                evaluates on a held-out test set, and writes inference-ready scripts, all
                without any human input.
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <div
                id="terminal-breast-cancer"
                className="w-full overflow-hidden rounded-lg border border-primary/20 bg-card/50 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/20 cursor-pointer"
                onClick={() => {
                  document.getElementById("terminal-breast-cancer")?.requestFullscreen?.();
                }}
              >
                <AsciinemaPlayer src="/breast_cancer.cast" className="w-full" zoom={2.5} />
              </div>
              <div
                className="mt-4 flex flex-col items-center justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => {
                  document.getElementById("terminal-breast-cancer")?.requestFullscreen?.();
                }}
              >
                <svg width="48" height="12" viewBox="0 0 48 12" className="text-primary">
                  <path d="M8 4 L4 8 L5 9 L8 6 L11 9 L12 8 Z" fill="currentColor" className="animate-chevron-1" />
                  <path d="M24 4 L20 8 L21 9 L24 6 L27 9 L28 8 Z" fill="currentColor" className="animate-chevron-2" />
                  <path d="M40 4 L36 8 L37 9 L40 6 L43 9 L44 8 Z" fill="currentColor" className="animate-chevron-3" />
                </svg>
                <span className="text-xs font-medium text-muted-foreground">Click to expand</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section id="results" className="w-full animate-fade-in-up py-12 md:py-24">
          <div className="container mx-auto space-y-12 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Benchmark Evaluation
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Agentomics ranks first in every domain tested. Results show mean leaderboard score
                (higher is better).
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="group relative overflow-hidden border border-primary/20 bg-card/90 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>Protein Engineering</CardTitle>
                  <p className="text-sm text-muted-foreground">6 datasets</p>
                </CardHeader>
                <CardContent>
                  <DatasetChart data={proteinData} />
                </CardContent>
              </Card>
              <Card className="group relative overflow-hidden border border-primary/20 bg-card/90 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>Drug Discovery</CardTitle>
                  <p className="text-sm text-muted-foreground">9 datasets</p>
                </CardHeader>
                <CardContent>
                  <DatasetChart data={drugData} />
                </CardContent>
              </Card>
              <Card className="group relative overflow-hidden border border-primary/20 bg-card/90 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle>Regulatory Genomics</CardTitle>
                  <p className="text-sm text-muted-foreground">5 datasets</p>
                </CardHeader>
                <CardContent>
                  <DatasetChart data={genomicsData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team">
          <TeamSection />
        </section>

        {/* Contact */}
        <section id="contact" className="w-full animate-fade-in-up py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Get in Touch
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                For collaboration inquiries, support, or to discuss using Agentomics in your
                research, reach out to us.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="text-lg">
                  <a href="mailto:biogemt@um.edu.mt">
                    <Mail className="mr-2 h-5 w-5" />
                    biogemt@um.edu.mt
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="z-10 border-t border-border/40">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Copyright />
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/BioGeMT/Agentomics-ML"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
