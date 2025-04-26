"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const { language, t } = useLanguage();

  const handleDownloadCV = () => {
    const cvUrl = language === "pt" ? "/cv-pt.pdf" : "/cv-en.pdf";

    window.open(cvUrl, "_blank");
  };

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("about.title")}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary-200 dark:border-primary-800">
              <Image
                src="/profile.jpg"
                alt="Ivan Junior"
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-2/3 max-md:text-center"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {t("about.description")}
            </p>

            <button
              onClick={handleDownloadCV}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <FaDownload className="mr-2" />
              {t("about.downloadCV")}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
