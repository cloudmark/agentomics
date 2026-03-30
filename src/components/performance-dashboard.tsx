"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatasetChart } from "./dataset-chart";
import { Database } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Data from Table 2 of the Agentomics paper (Regulatory Genomics domain)
// Metric values multiplied ×100 for chart display
const datasets = [
  {
    name: "AGO2_CLASH_Hejret2023",
    displayName: "miRNA–Target Interaction",
    code: "AGO2",
    sourceName: "miRBench",
    url: "https://github.com/katarinagresova/miRBench",
    n: 8193,
    description:
      "MicroRNA–target chimeric pairs identified via AGO2 CLASH technology. Each sample consists of two RNA sequences; the task is binary classification of whether they bind in the context of the AGO2 protein.",
    goal: "Predict which miRNA–target pairs interact in the context of AGO2.",
    performance: {
      metric: "AUPRC",
      data: [
        { name: "Human SoTA", value: 86.0 },
        { name: "Agentomics (best)", value: 88.0 },
        { name: "Agentomics (mean)", value: 83.2 },
        { name: "Agentomics (worst)", value: 77.4 },
        { name: "Biomni", value: null },
      ],
    },
    successRate: [
      { name: "Agentomics", value: 100 },
      { name: "Biomni", value: 100 },
      { name: "Zero-Shot LLM", value: 80 },
    ],
  },
  {
    name: "Drosophila_Enhancers_Stark",
    displayName: "Drosophila Enhancer Classification",
    code: "DE",
    sourceName: "Genomic Benchmarks",
    url: "https://github.com/ML-Bioinfo-CEITEC/genomic_benchmarks",
    n: 6914,
    description:
      "Drosophila enhancer sequences against random genomic controls. Enhancers are cis-regulatory elements that activate gene transcription independent of orientation and distance.",
    goal: "Classify Drosophila DNA sequences as enhancers or non-enhancers.",
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SoTA", value: 68.6 },
        { name: "Agentomics (best)", value: 83.8 },
        { name: "Agentomics (mean)", value: 81.9 },
        { name: "Agentomics (worst)", value: 80.3 },
        { name: "Biomni", value: null },
      ],
    },
    successRate: [
      { name: "Agentomics", value: 100 },
      { name: "Biomni", value: 100 },
      { name: "Zero-Shot LLM", value: 80 },
    ],
  },
  {
    name: "Human_Enhancers_Cohn",
    displayName: "Human Enhancer Classification (Cohn)",
    code: "HEC",
    sourceName: "Genomic Benchmarks",
    url: "https://github.com/ML-Bioinfo-CEITEC/genomic_benchmarks",
    n: 27791,
    description:
      "Experimental human enhancers versus size-matched random genomic regions. Enhancers were identified by transfection assays in HEK293T cells.",
    goal: "Distinguish experimental human enhancer sequences from genomic background.",
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SoTA", value: 74.7 },
        { name: "Agentomics (best)", value: 75.9 },
        { name: "Agentomics (mean)", value: 75.0 },
        { name: "Agentomics (worst)", value: 73.8 },
        { name: "Biomni", value: null },
      ],
    },
    successRate: [
      { name: "Agentomics", value: 100 },
      { name: "Biomni", value: 100 },
      { name: "Zero-Shot LLM", value: 80 },
    ],
  },
  {
    name: "Human_Enhancers_Ensembl",
    displayName: "Human Enhancer Classification (Ensembl)",
    code: "HEE",
    sourceName: "Genomic Benchmarks",
    url: "https://github.com/ML-Bioinfo-CEITEC/genomic_benchmarks",
    n: 154842,
    description:
      "Human enhancer elements from Ensembl regulatory build against random genomic background sequences. A large-scale benchmark for regulatory element classification.",
    goal: "Classify human genomic sequences as Ensembl-annotated enhancers or background.",
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SoTA", value: 93.3 },
        { name: "Agentomics (best)", value: 91.6 },
        { name: "Agentomics (mean)", value: 89.7 },
        { name: "Agentomics (worst)", value: 88.0 },
        { name: "Biomni", value: null },
      ],
    },
    successRate: [
      { name: "Agentomics", value: 100 },
      { name: "Biomni", value: 100 },
      { name: "Zero-Shot LLM", value: 80 },
    ],
  },
  {
    name: "Human_OCR_Ensembl",
    displayName: "Open Chromatin Region Classification",
    code: "OCRE",
    sourceName: "Genomic Benchmarks",
    url: "https://github.com/ML-Bioinfo-CEITEC/genomic_benchmarks",
    n: 174756,
    description:
      "Open chromatin regions (OCRs) from the Ensembl regulatory build against size-matched random genomic sequences. OCRs are nucleosome-depleted regions associated with active transcription.",
    goal: "Classify human sequences as open chromatin regions or genomic background.",
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SoTA", value: 82.5 },
        { name: "Agentomics (best)", value: 82.5 },
        { name: "Agentomics (mean)", value: 79.0 },
        { name: "Agentomics (worst)", value: 75.4 },
        { name: "Biomni", value: null },
      ],
    },
    successRate: [
      { name: "Agentomics", value: 100 },
      { name: "Biomni", value: 100 },
      { name: "Zero-Shot LLM", value: 80 },
    ],
  },
];

export function PerformanceDashboard() {
  return (
    <div className="border border-border rounded-md overflow-hidden">
      <Tabs defaultValue={datasets[0].code} className="flex flex-col">
        {/* Dataset selector */}
        <div className="border-b border-border bg-muted/30">
          <div className="relative px-8">
            <Carousel opts={{ align: "start" }} className="w-full">
              <TabsList className="bg-transparent p-0 h-auto justify-start w-full">
                <CarouselContent className="-ml-0">
                  {datasets.map((dataset) => (
                    <CarouselItem
                      key={dataset.code}
                      className="pl-0 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <TabsTrigger
                        value={dataset.code}
                        className="w-full justify-start rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:bg-muted/50 text-left h-full"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Database className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                          <div className="text-left min-w-0">
                            <p className="font-medium truncate text-xs">
                              {dataset.displayName}
                            </p>
                            <p className="text-xs font-mono font-normal text-muted-foreground">
                              N={dataset.n.toLocaleString()} · {dataset.performance.metric}
                            </p>
                          </div>
                        </div>
                      </TabsTrigger>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </TabsList>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-6 w-6" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-6 w-6" />
            </Carousel>
          </div>
        </div>

        {/* Dataset content */}
        <div className="flex-1">
          {datasets.map((dataset) => (
            <TabsContent
              key={dataset.code}
              value={dataset.code}
              className="m-0"
            >
              <div className="p-6 space-y-8">
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="font-semibold">{dataset.displayName}</h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {dataset.name} · N={dataset.n.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {dataset.description}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="text-muted-foreground">Task: </span>
                    {dataset.goal}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                      {dataset.performance.metric} Score
                    </p>
                    <DatasetChart
                      data={dataset.performance.data}
                      unit="%"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                      Run Success Rate
                    </p>
                    <DatasetChart data={dataset.successRate} unit="%" />
                  </div>
                </div>

                <Button asChild variant="link" className="p-0 h-auto text-xs font-mono text-muted-foreground hover:text-foreground">
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dataset.sourceName} →
                  </a>
                </Button>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
