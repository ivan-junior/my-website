import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import DynamicFavicon from "@/components/DynamicFavicon";
import "../globals.css";
import "../favicon.css";
import type { Language } from "@/contexts/LanguageContext";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Ivan Junior | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em JavaScript e TypeScript, criando soluções web e mobile inovadoras com foco em IA e automação inteligente.",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Garantir que o lang é um valor válido do tipo Language
  const validLang: Language = lang === "en" ? "en" : "pt";

  return (
    <html lang={validLang} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${GeistSans.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <DynamicFavicon />
        <ThemeProvider>
          <LanguageProvider initialLanguage={validLang}>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
