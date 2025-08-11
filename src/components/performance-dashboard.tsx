"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatasetChart } from "./dataset-chart";
import { ArrowRight, Database } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const datasets = [
  {
    name: "AGO2_CLASH_Hejret",
    displayName: "RNA Molecule Interaction Prediction",
    code: "AGO2",
    sourceName: "miRBench Package",
    url: "https://github.com/katarinagresova/miRBench",
    description:
      "This is a very challenging biological dataset. It's used to study how two different types of RNA molecules, which are like instruction manuals in a cell, interact with each other. A key feature of this dataset is that these molecules are of different and sometimes changing lengths, making it difficult to analyze.",
    goal: "The AI's goal is to predict which pairs of RNA molecules will interact successfully.",
    successRate: [
      { name: "Agentomics-ML (feedback)", value: 100 },
      { name: "Agentomics-ML (no feedback)", value: 100 },
      { name: "AIDE", value: 0 },
      { name: "DI", value: 0 },
      { name: "Zero-shot LLMs", value: 0 },
    ],
    performance: {
      metric: "AP Score",
      data: [
        { name: "Human SOTA", value: 86 },
        { name: "Agentomics-ML (feedback)", value: 77.8 },
        { name: "Agentomics-ML (no feedback)", value: 72.4 },
        { name: "AIDE", value: null },
        { name: "DI", value: null },
        { name: "Zero-shot LLMs", value: null },
      ],
    },
  },
  {
    name: "drosophila_enhancers_stark",
    displayName: "Fruit Fly DNA Enhancer Classification",
    code: "DE",
    sourceName: "Hugging Face",
    url: "https://huggingface.co/datasets/katielink/genomic-benchmarks",
    description:
      'This dataset contains genetic sequences from fruit flies. The sequences are "enhancers," which are specific regions of DNA that act like on/off switches to control when and where certain genes are activated. The data is part of the Genomic Benchmarks collection.',
    goal: "The AI's goal is to correctly classify which DNA sequences are enhancers and which are not.",
    successRate: [
      { name: "Agentomics-ML (with feedback)", value: 100 },
      { name: "Agentomics-ML (without feedback)", value: 100 },
      { name: "AIDE", value: 0 },
      { name: "DI", value: 20 },
      { name: "Zero-shot LLMs", value: 100 },
    ],
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SOTA", value: 58.6 },
        { name: "Agentomics-ML (feedback)", value: 73.6 },
        { name: "Agentomics-ML (no feedback)", value: 71.6 },
        { name: "AIDE", value: null },
        { name: "DI", value: 50 },
        { name: "Zero-shot LLMs", value: 70.8 },
      ],
    },
  },
  {
    name: "human_enhancers_cohn",
    displayName: "Human DNA Enhancer Classification",
    code: "HEC",
    sourceName: "Hugging Face",
    url: "https://huggingface.co/datasets/katielink/genomic-benchmarks",
    description:
      'This dataset contains human DNA sequences that are also enhancers—the "on/off switches" for genes. It is a part of the Genomic Benchmarks collection.',
    goal: "The AI's goal is to correctly classify which human DNA sequences are enhancers and which are not.",
    successRate: [
      { name: "Agentomics-ML (with feedback)", value: 100 },
      { name: "Agentomics-ML (without feedback)", value: 100 },
      { name: "AIDE", value: 0 },
      { name: "DI", value: 20 },
      { name: "Zero-shot LLMs", value: 40 },
    ],
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SOTA", value: 74.7 },
        { name: "Agentomics-ML (feedback)", value: 74.3 },
        { name: "Agentomics-ML (no feedback)", value: 71.6 },
        { name: "AIDE", value: null },
        { name: "DI", value: 72.4 },
        { name: "Zero-shot LLMs", value: 72.8 },
      ],
    },
  },
  {
    name: "human_enhancers_eijkemans",
    displayName: "Human Gene Expression Control",
    code: "HEE",
    sourceName: "Hugging Face",
    url: "https://huggingface.co/datasets/katielink/genomic-benchmarks",
    description:
      "This is another dataset of human enhancer sequences, which are the DNA regions that control gene expression. It is part of the Genomic Benchmarks collection.",
    goal: "The AI's goal is to correctly classify which human DNA sequences are enhancers.",
    successRate: [
      { name: "Agentomics-ML (with feedback)", value: 100 },
      { name: "Agentomics-ML (without feedback)", value: 100 },
      { name: "AIDE", value: 0 },
      { name: "DI", value: 40 },
      { name: "Zero-shot LLMs", value: 80 },
    ],
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SOTA", value: 93.3 },
        { name: "Agentomics-ML (feedback)", value: 88.5 },
        { name: "Agentomics-ML (no feedback)", value: 86.4 },
        { name: "AIDE", value: null },
        { name: "DI", value: 75.2 },
        { name: "Zero-shot LLMs", value: 86.4 },
      ],
    },
  },
  {
    name: "human_nontata_promoters",
    displayName: "Human Gene Promoter Detection",
    code: "NTP",
    sourceName: "Hugging Face",
    url: "https://huggingface.co/datasets/katielink/genomic-benchmarks",
    description:
      'This dataset contains human DNA sequences for "promoters," which are the starting points for gene transcription (the process of making an RNA copy from a gene). Unlike other promoters, these lack a specific "TATA box" sequence, which makes them more difficult to identify. It is from the Genomic Benchmarks collection.',
    goal: "The AI's goal is to correctly identify and classify these non-TATA promoter sequences.",
    successRate: [
      { name: "Agentomics-ML (with feedback)", value: 60 },
      { name: "Agentomics-ML (without feedback)", value: 60 },
      { name: "AIDE", value: 40 },
      { name: "DI", value: 60 },
      { name: "Zero-shot LLMs", value: 60 },
    ],
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SOTA", value: 97.4 },
        { name: "Agentomics-ML (feedback)", value: 92.5 },
        { name: "Agentomics-ML (no feedback)", value: 89.7 },
        { name: "AIDE", value: 92 },
        { name: "DI", value: 87.4 },
        { name: "Zero-shot LLMs", value: 90.1 },
      ],
    },
  },
  {
    name: "human_ocr_ensembl",
    displayName: "Human Chromatin Region Analysis",
    code: "OCRE",
    sourceName: "Genomic Benchmarks Package",
    url: "https://huggingface.co/datasets/katielink/genomic-benchmarks",
    description:
      'This dataset focuses on "open chromatin regions" (OCRs) in human DNA, which are parts of the genome that are accessible for transcription. These regions are important for gene regulation. The data is from the Genomic Benchmarks collection.',
    goal: "The AI's goal is to correctly identify and classify these open chromatin regions.",
    successRate: [
      { name: "Agentomics-ML (with feedback)", value: 100 },
      { name: "Agentomics-ML (without feedback)", value: 100 },
      { name: "AIDE", value: 20 },
      { name: "DI", value: 0 },
      { name: "Zero-shot LLMs", value: 100 },
    ],
    performance: {
      metric: "Accuracy",
      data: [
        { name: "Human SOTA", value: 82.5 },
        { name: "Agentomics-ML (feedback)", value: 81.6 },
        { name: "Agentomics-ML (no feedback)", value: 78.6 },
        { name: "AIDE", value: 75.8 },
        { name: "DI", value: null },
        { name: "Zero-shot LLMs", value: 66.6 },
      ],
    },
  },
];

export function PerformanceDashboard() {
  return (
    <Card className="border-primary/20 bg-card/50 shadow-lg shadow-primary/10 supports-[backdrop-filter]:bg-card/20 backdrop-blur">
      <CardContent className="p-6">
        <Tabs defaultValue={datasets[0].code} className="flex flex-col gap-8">
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <TabsList className="bg-transparent p-0 h-auto justify-start relative w-full">
                <CarouselContent className="-ml-2">
                  {datasets.map((dataset) => (
                    <CarouselItem
                      key={dataset.code}
                      className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <TabsTrigger
                        key={dataset.code}
                        value={dataset.code}
                        className="w-full justify-between rounded-md p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none hover:bg-muted/50 h-full text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Database className="h-5 w-5 flex-shrink-0" />
                          <div className="text-left flex-1 min-w-0 overflow-hidden">
                            <p className="font-semibold truncate text-sm">
                              {dataset.displayName}
                            </p>
                            <p className="text-xs font-normal text-muted-foreground line-clamp-2">
                              {dataset.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground group-data-[state=active]:text-primary ml-2" />
                      </TabsTrigger>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </TabsList>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </div>

          <div className="flex-1">
            {datasets.map((dataset) => {
              const successRateData = dataset.successRate.map((item) => ({
                name: item.name,
                value: item.value,
              }));

              const performanceData = dataset.performance.data.map((d) => ({
                name: d.name,
                value: d.value,
              }));

              return (
                <TabsContent
                  key={dataset.code}
                  value={dataset.code}
                  className="m-0"
                >
                  <Card className="bg-card/70 border-primary/20">
                    <CardHeader>
                      <CardTitle>{dataset.displayName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Dataset: {dataset.name} ({dataset.code})
                      </p>
                      <div className="mt-2 text-sm text-foreground bg-primary/10 p-3 rounded-md">
                        <span className="font-semibold text-primary">
                          Goal:
                        </span>{" "}
                        {dataset.goal}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <p className="text-lg text-muted-foreground">
                        {dataset.description}
                      </p>

                      <div className="space-y-4">
                        <h4 className="font-semibold mb-2">
                          Model Performance ({dataset.performance.metric})
                        </h4>
                        <div className="h-[300px]">
                          <DatasetChart data={performanceData} unit="%" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold mb-2">
                          Success Rate of Producing Workable Code
                        </h4>
                        <div className="h-[300px]">
                          <DatasetChart data={successRateData} unit="%" />
                        </div>
                      </div>

                      <Button asChild variant="link" className="p-0">
                        <a
                          href={dataset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on {dataset.sourceName} &rarr;
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
