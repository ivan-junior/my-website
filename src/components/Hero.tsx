"use client";

import { useLanguage } from "../contexts/LanguageContext";
import Link from "next/link";
import SpiderWeb from "./SpiderWeb";
import TypingTerminal from "./TypingTerminal";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="min-h-(calc(100vh-6rem)) mt-24">
      <SpiderWeb />
      {/* Main content */}
      <div className="container mx-auto px-16 flex min-h-[calc(100vh-6rem)]">
        <div className="flex flex-col md:flex-row w-full items-center gap-12 md:gap-8">
          {/* Text Content - Left */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("hero.greeting")} Ivan
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-900 dark:text-gray-300">
              {t("hero.description")}
            </p>

            <div>
              <Link
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg max-md:text-base rounded-md transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                {t("hero.cta")}
              </Link>
            </div>
          </div>

          {/* Terminal - Right */}
          <div className="flex-1 flex justify-center items-center">
            <TypingTerminal />
          </div>
        </div>
      </div>
    </div>
  );
}
