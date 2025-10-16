"use client";

import {
  BrainCircuit,
  Code,
  Component,
  Database,
  FileCode,
  FunctionSquare,
  Github,
  Rocket,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

import { Copyright } from "@/components/copyright";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AsciinemaPlayer } from "@/components/asciinema-player";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PerformanceDashboard } from "@/components/performance-dashboard";
import { ThemeToggle } from "@/components/theme-toggle";
import { TeamSection } from "@/components/team-section";

const coreComponents = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Autonomous Agent",
    description:
      "Leverage an AI agent to automatically handle the entire ML pipeline, from data exploration to a fully trained model.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Dynamic Model Design",
    description:
      "The agent selects the best AI algorithm for the task, designing an optimized and novel model architecture for your data.",
  },
  {
    icon: <FunctionSquare className="h-8 w-8 text-primary" />,
    title: "Functional Models",
    description:
      "Agentomics outputs fully functional, trainable models and inference scripts, ready for your data pipeline.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Framework Agnostic",
    description:
      "The underlying LLM can choose the best framework for the job, including PyTorch, TensorFlow, JAX, and more.",
  },
];

const howItWorksSteps = [
  {
    title: "Data Exploration",
    description:
      "Our agent analyzes your dataset, identifying its structure, features, and target outcomes to build the best possible model.",
  },
  {
    title: "Dynamic Model Generation",
    description:
      "Next, it designs a custom-tailored model optimized for your data, generating code in PyTorch, TensorFlow, or JAX.",
  },
  {
    title: "Code & Script Generation",
    description:
      "Finally, the agent delivers production-ready Python code, including a ready-to-use inference script for new predictions.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-transparent text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/95">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a
            href="#"
            className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <span className="font-bold text-lg tracking-tight">Agentomics</span>
          </a>
          <nav className="hidden items-center space-x-8 text-sm font-medium lg:flex">
            <a
              href="#how-it-works"
              className="transition-all duration-200 hover:text-primary hover:scale-105 whitespace-nowrap relative group"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#features"
              className="transition-all duration-200 hover:text-primary hover:scale-105 whitespace-nowrap relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#get-started"
              className="transition-all duration-200 hover:text-primary hover:scale-105 whitespace-nowrap relative group"
            >
              Get Started
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#training-a-model"
              className="transition-all duration-200 hover:text-primary hover:scale-105 whitespace-nowrap relative group"
            >
              Training a Model
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#inference"
              className="transition-all duration-200 hover:text-primary hover:scale-105 whitespace-nowrap relative group"
            >
              Inference
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#comparison"
              className="transition-all duration-200 hover:text-primary hover:scale-105 whitespace-nowrap relative group"
            >
              Performance
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeToggle />
            <Button asChild>
              <a
                href="https://github.com/BioGeMT/Agentomics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="z-10 flex-1">
        <section
          id="hero"
          className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40"
        >
          <div className="container mx-auto flex flex-col items-center px-4 text-center">
            <div className="relative w-full flex items-center justify-center">
              <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-center">
                <span className="blur-to-focus-text">Agentomics</span>
              </h1>
            </div>

            <p className="mx-auto mt-6 max-w-[700px] text-2xl md:text-2xl text-muted-foreground">
              The AI-powered framework that builds machine learning models for
              you. For categorical and regression data.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="text-lg">
                <a href="#get-started">Get Started</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <a
                  href="https://arxiv.org/abs/2506.05542"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the Paper
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section id="value-prop" className="w-full animate-fade-in-up pt-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                The future of model generation.
              </h2>
              <p className="mt-4 text-muted-foreground md:text-2xl">
                Agentomics simplifies development by automating the entire
                pipeline, allowing you to focus on the results, not the
                boilerplate.
              </p>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full animate-fade-in-up pb-12 pt-12 md:pb-24"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {coreComponents.map((component) => (
                <Card
                  key={component.title}
                  className="group relative overflow-hidden border border-primary/20 bg-card/90 text-center shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 supports-[backdrop-filter]:bg-card/70 backdrop-blur-md backdrop-saturate-150"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <CardHeader className="relative items-center pb-4">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30">
                      <div className="transform transition-transform duration-300 group-hover:scale-110">
                        {component.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight">
                      {component.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative pt-0">
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {component.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full animate-fade-in-up py-12 md:py-24"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-muted-foreground md:text-2xl">
                The agent follows a simple, three-step process to generate a
                production-ready model.
              </p>
            </div>
            <div className="mx-auto max-w-2xl space-y-8">
              {howItWorksSteps.map((step, index) => (
                <div key={step.title}>
                  <Card className="border border-primary/20 bg-card/80 shadow-lg shadow-primary/10 transition-all hover:scale-105 hover:shadow-primary/20 supports-[backdrop-filter]:bg-card/60 backdrop-blur-md backdrop-saturate-150">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <CardTitle>{step.title}</CardTitle>
                          <p className="mt-2 text-lg text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="get-started"
          className="w-full animate-fade-in-up py-12 md:py-24"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Get Started in Seconds
              </h2>
              <p className="mt-4 text-muted-foreground md:text-2xl">
                Clone the repository and run the setup script. That's all it
                takes to start building models with Agentomics.
              </p>
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tighter sm:text-3xl">
                    One-Command Setup
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground">
                    This terminal recording shows you how to get Agentomics
                    running on your local machine with just two commands. It's
                    fast, simple, and ready to go.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      1
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Clone the Repository:
                      </strong>{" "}
                      The `git clone` command downloads the project from GitHub,
                      giving you immediate access to all the code.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      2
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Run the Script:
                      </strong>{" "}
                      The `./run.sh` command installs all the necessary
                      dependencies and starts the development server, making the
                      application available in your browser right away.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg border border-primary/20 bg-card/50 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/20">
                  <div className="bg-muted/50 px-4 py-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <AsciinemaPlayer src="/get_started.cast" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="training-a-model"
          className="w-full animate-fade-in-up py-12 md:py-24"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                See How Easy It Is to Train a Model
              </h2>
              <p className="mt-4 text-muted-foreground md:text-2xl">
                Watch the Agentomics agent train a breast cancer classification
                model from scratch. We've included the dataset in the project,
                so you can follow along and run it yourself.
              </p>
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tighter sm:text-3xl">
                    What You're Seeing
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground">
                    In this demo, the agent trains a model on the Breast Cancer
                    Wisconsin (Diagnostic) dataset to predict if a tumor is
                    malignant or benign.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      1
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Data Preparation:
                      </strong>{" "}
                      The agent automatically detects the dataset and prepares
                      it for training, splitting it into training, testing, and
                      inference sets.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      2
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Autonomous Training:
                      </strong>{" "}
                      The agent selects a model, trains it, and evaluates its
                      performance using AUPRC, the ideal metric for this
                      imbalanced medical dataset.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      3
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Model & Scripts Saved:
                      </strong>{" "}
                      Once finished, the agent saves the fully trained model
                      (`final_model.joblib`) and the necessary inference scripts
                      (`inference.py`), ready for immediate use.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tighter sm:text-3xl">
                    Strong Test Set Performance
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground">
                    The agent achieved a high AUPRC score on the held-out test
                    set, demonstrating strong generalization. The model
                    effectively learned to distinguish between malignant and
                    benign tumors, showcasing Agentomics' ability to generate
                    robust and reliable machine learning models.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg border border-primary/20 bg-card/50 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/20">
                  <div className="bg-muted/50 px-4 py-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <AsciinemaPlayer
                    src="/breast_cancer.cast"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="inference"
          className="w-full animate-fade-in-up py-12 md:py-24"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Running Inference on New Data
              </h2>
              <p className="mt-4 text-muted-foreground md:text-2xl">
                The agent doesn't just produce a model—it produces a fully
                functional inference script. Here's how you can use it to make
                predictions on new, unseen data.
              </p>
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div className="w-full">
                <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg border border-primary/20 bg-card/50 shadow-lg shadow-primary/10 backdrop-blur supports-[backdrop-filter]:bg-card/20">
                  <div className="bg-muted/50 px-4 py-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <AsciinemaPlayer src="/infer.cast" className="w-full" />
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tighter sm:text-3xl">
                    From Model to Prediction
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground">
                    This recording shows the final, most important step: using
                    the trained model to make predictions. The process is simple
                    and transparent.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      1
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Load New Data:
                      </strong>{" "}
                      We start with `infer.csv`, a set of data the model has
                      never seen before. This simulates a real-world scenario
                      where you need to classify new samples.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      2
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Run the Inference Script:
                      </strong>{" "}
                      The agent-generated `inference.py` script is executed,
                      loading our saved `final_model.joblib` and applying it to
                      the new data.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      3
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Get Probabilities:
                      </strong>{" "}
                      The output is a `results.csv` file containing the model's
                      predictions as probabilities. A value near 1.0 means high
                      confidence of malignancy, and a value near 0.0 means high
                      confidence of being benign.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      4
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">
                        Compare and Verify:
                      </strong>{" "}
                      The final command gives you a direct, side-by-side
                      comparison of the model's predictions and the actual
                      diagnoses, instantly confirming its accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="comparison"
          className="w-full animate-fade-in-up py-12 md:py-24"
        >
          <div className="container mx-auto space-y-12 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                How Agentomics Compares
              </h2>
              <p className="mt-4 text-muted-foreground md:text-2xl">
                Agentomics consistently outperforms other AI-based methods and
                even surpasses human-level performance on complex biological
                datasets. The data below shows a clear advantage in both code
                generation success and model performance.
              </p>
            </div>

            <PerformanceDashboard />

            <Card className="border-primary/20 bg-card/50 shadow-lg shadow-primary/10 supports-[backdrop-filter]:bg-card/20 backdrop-blur">
              <CardHeader>
                <CardTitle>Comparison with Traditional AutoML</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  While traditional AutoML systems excel at optimizing standard
                  models, they often fall short on the complex, domain-specific
                  datasets found in computational biology. Agentomics is
                  engineered to overcome these limitations. By leveraging a
                  generative AI agent, it can design novel and intricate model
                  architectures tailored to these unique challenges, providing a
                  level of customization and performance that traditional AutoML
                  struggles to match.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <TeamSection />
      </main>

      <footer className="z-10 border-t border-border/40">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Copyright />
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/BioGeMT/Agentomics"
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
