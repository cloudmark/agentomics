import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClientBackground } from "@/components/client-background";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Agentomics - Generative AI Framework for ML Models",
  description:
    "Agentomics is a cutting-edge generative AI framework that enables you to build functional machine learning models with advanced automation and intelligent training capabilities.",
  keywords: [
    "generative AI",
    "machine learning",
    "AI framework",
    "ML models",
    "artificial intelligence",
    "automated training",
    "data science",
    "predictive modeling",
  ],
  authors: [{ name: "Agentomics Team" }],
  creator: "Agentomics",
  publisher: "Agentomics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://agentomics.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agentomics.com",
    title: "Agentomics - Generative AI Framework for ML Models",
    description:
      "Build functional machine learning models with our advanced generative AI framework. Automate training, optimize performance, and create intelligent ML solutions.",
    siteName: "Agentomics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agentomics - Generative AI Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentomics - Generative AI Framework for ML Models",
    description:
      "Build functional machine learning models with our advanced generative AI framework. Automate training, optimize performance, and create intelligent ML solutions.",
    images: ["/og-image.png"],
    creator: "@agentomics",
    site: "@agentomics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   yahoo: "your-yahoo-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,700&family=Source+Code+Pro:wght@500&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Agentomics" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <ClientBackground />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
