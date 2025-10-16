"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TeamMember = {
  name: string;
  role?: string;
  bio: string;
  imageSrc?: string;
  initials: string;
};

const team: TeamMember[] = [
  {
    name: "Dr. Panagiotis Alexiou",
    role: "ERA Chair, Bioinformatics",
    bio: "Dr. Panagiotis (Panos) Alexiou is the ERA Chair in Bioinformatics for Genomics at the University of Malta. His research focuses on the development of Machine Learning applications applied in Genomics.",
    imageSrc: "/avatars/panos.jpg",
    initials: "PA",
  },
  {
    name: "Dr. Vlastimil Martinek",
    role: "Research Scientist",
    bio: "Research scientist with experience in deep learning and computational biology research. Developed benchmarks and state-of-the-art deep learning models for genomics and transcriptomics.",
    imageSrc: "/avatars/vlasta.jpg",
    initials: "VM",
  },
  {
    name: "Andrea Gariboldi",
    role: "Research Scientist",
    bio: "Research scientist with hands-on experience in relational data modeling and SQL, and agentic LLM systems. Passionate about advancing capabilities in Generative AI and Machine Learning.",
    imageSrc: "/avatars/andrea.jpg",
    initials: "AG",
  },
  {
    name: "Dimosthenis Tzimotoudis",
    role: "Research Scientist, PhD Candidate",
    bio: "Research Scientist and PhD candidate in Bioinformatics focusing on evolutionary biology. Develops small RNA deep learning models and genomic sequence mapping algorithms.",
    imageSrc: "/avatars/dimos.jpg",
    initials: "DT",
  },
  {
    name: "Mark Galea",
    role: "Research Scientist",
    bio: "Research Scientist and team member with experience building deep learning models for audio event detection and face recognition systems.",
    imageSrc: "/avatars/mark.jpg",
    initials: "MG",
  },
  {
    name: "David Čechák",
    role: "PhD Candidate, Bioinformatics",
    bio: "Applies machine learning to uncover the rules governing miRNA and Ago2 binding to mRNA and subsequent gene regulation.",
    imageSrc: "/avatars/david.jpg",
    initials: "DČ",
  },
  {
    name: "Edward Blake",
    role: "Bioinformatician",
    bio: "Bioinformatician specializing in large-scale genomic analysis and machine learning model development for drug target identification in myocardial infarction.",
    imageSrc: "/avatars/edward.jpg",
    initials: "EB",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="w-full animate-fade-in-up py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
            Meet the Team
          </h2>
          <p className="mt-4 text-muted-foreground md:text-2xl">
            The people behind Agentomics.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {team.map((member) => (
            <Card
              key={member.name}
              className="group relative w-full max-w-sm overflow-hidden border border-primary/30 bg-card/70 shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 supports-[backdrop-filter]:bg-card/50 backdrop-blur-md backdrop-saturate-150"
            >
              <div className="pointer-events-none absolute -inset-24 rounded-[32px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-px rounded-[10px] bg-gradient-to-br from-primary/10 via-transparent to-fuchsia-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="relative z-10 flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-primary/40 transition-shadow duration-300 group-hover:ring-primary group-hover:shadow-[0_0_0_4px_rgba(99,102,241,0.18)]">
                  {member.imageSrc ? (
                    <AvatarImage
                      src={member.imageSrc}
                      alt={member.name}
                      className="transition-transform duration-300 ease-out will-change-transform group-hover:scale-110"
                    />
                  ) : (
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0">
                  <CardTitle className="truncate text-xl transition-colors duration-300 group-hover:text-primary">
                    {member.name}
                  </CardTitle>
                  {member.role ? (
                    <p className="text-sm text-muted-foreground truncate">
                      {member.role}
                    </p>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
