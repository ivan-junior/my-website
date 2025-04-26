"use client";

import { useLanguage } from "../contexts/LanguageContext";
import Typewriter from "typewriter-effect";

export default function TypingTerminal() {
  const { language } = useLanguage();

  const phrases = {
    pt: [
      "Desenvolvedor Frontend",
      "Desenvolvedor Backend",
      "Desenvolvedor Mobile",
      "Fã de Star Wars",
      "Entusiasta de IA",
      "Excelente Comunicador",
      "Solucionador de Problemas",
    ],
    en: [
      "Frontend Developer",
      "Backend Developer",
      "Mobile Developer",
      "Star Wars Fan",
      "AI Enthusiast",
      "Excellent Communicator",
      "Problem Solver",
    ],
  };

  return (
    <div className="w-full max-w-[95vw] md:max-w-[600px] h-[220px] bg-gray-900 rounded-lg shadow-xl overflow-hidden">
      {/* Terminal Header */}
      <div className="h-8 bg-gray-800 flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6">
        <div className="text-green-500 font-mono text-lg md:text-xl min-w-[280px]">
          <span className="text-blue-400">~/portfolio</span>{" "}
          <span className="text-pink-500">$</span>{" "}
          <span className="text-white inline-block min-w-[200px]">
            <Typewriter
              options={{
                strings: phrases[language as keyof typeof phrases],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 80,
                cursor: "▋",
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
