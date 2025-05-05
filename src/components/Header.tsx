"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full flex justify-end p-8 top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold text-primary-600 dark:text-primary-400"
          >
            IVAN JUNIOR
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#home"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            {t("header.home")}
          </Link>
          <Link
            href="#about"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            {t("header.about")}
          </Link>
          <Link
            href="#experience"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            {t("header.experience")}
          </Link>
          <Link
            href="#skills"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            {t("header.skills")}
          </Link>
          <Link
            href="#contact"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            {t("header.contact")}
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label={`Switch to ${
                language === "pt" ? "English" : "Portuguese"
              }`}
            >
              {language === "pt" ? "EN" : "PT"}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              {theme === "light" ? (
                <FaMoon className="text-gray-700" />
              ) : (
                <FaSun className="text-yellow-400" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label={`Switch to ${
              language === "pt" ? "English" : "Portuguese"
            }`}
          >
            {language === "pt" ? "EN" : "PT"}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? (
              <FaMoon className="text-gray-700" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-8 border-b border-gray-200 dark:border-gray-800">
            <Link
              href="/"
              className="text-xl font-bold text-primary-600 dark:text-primary-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              IVAN JUNIOR
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              aria-label="Close menu"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col flex-grow justify-center px-8">
            <Link
              href="#home"
              className="py-4 text-2xl font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.home")}
            </Link>
            <Link
              href="#about"
              className="py-4 text-2xl font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.about")}
            </Link>
            <Link
              href="#experience"
              className="py-4 text-2xl font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.experience")}
            </Link>
            <Link
              href="#skills"
              className="py-4 text-2xl font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.skills")}
            </Link>
            <Link
              href="#contact"
              className="py-4 text-2xl font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.contact")}
            </Link>
          </nav>

          {/* Menu Footer */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 text-lg border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label={`Switch to ${language === "pt" ? "English" : "Portuguese"}`}
              >
                {language === "pt" ? "EN" : "PT"}
              </button>
              <button
                onClick={toggleTheme}
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? (
                  <FaMoon className="w-6 h-6 text-gray-700" />
                ) : (
                  <FaSun className="w-6 h-6 text-yellow-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
