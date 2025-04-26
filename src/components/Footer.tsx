"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const { language, t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="mt-2 ">
              {t("footer.copyright")
                .replace("{year}", currentYear.toString())
                .replace("{name}", "Ivan Junior")}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/ivan-junior"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/ivan-junior-dev"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <Link href="#home" className=" hover:text-white transition-colors">
              {t("header.home")}
            </Link>
            <Link href="#about" className=" hover:text-white transition-colors">
              {t("header.about")}
            </Link>
            <Link
              href="#experience"
              className=" hover:text-white transition-colors"
            >
              {t("header.experience")}
            </Link>
            <Link
              href="#skills"
              className=" hover:text-white transition-colors"
            >
              {t("header.skills")}
            </Link>
            <Link
              href="#contact"
              className=" hover:text-white transition-colors"
            >
              {t("header.contact")}
            </Link>
          </nav>

          <div>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center  hover:text-white transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              {language === "pt" ? "Voltar ao topo" : "Back to top"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
