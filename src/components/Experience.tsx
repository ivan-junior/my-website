"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Experience() {
  const { translations, t } = useLanguage();
  const experiences = translations.experience?.items || [];
  const [visibleCount, setVisibleCount] = useState(3);

  const showLoadMore = experiences.length > visibleCount;
  const visibleExperiences = experiences.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(experiences.length);
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("experience.title")}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-primary-500 pl-8 ml-4">
            {visibleExperiences.map((experience: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 relative"
              >
                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-[#0284c7] dark:bg-[#0ea5e9] border-2 border-[#0ea5e9] dark:border-[#38bdf8] shadow-md transform scale-100 hover:scale-110 transition-transform duration-200 z-10"></div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {experience.role}
                    </h3>
                    <span className="text-sm font-medium text-primary-600">
                      {experience.period}
                    </span>
                  </div>

                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {experience.company}
                  </p>

                  <p className="text-gray-600 dark:text-gray-400">
                    {experience.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {showLoadMore && (
            <div className="text-center mt-8">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                onClick={handleLoadMore}
              >
                {t("common.loadMore")}...
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
