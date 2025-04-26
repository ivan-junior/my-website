"use client";

import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContactFormSchema,
  type ContactFormData,
} from "@/schemas/contact";

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(createContactFormSchema(t)),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/send", data);

      if (response.status === 200) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        console.error("Error response:", response.data);
      }

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");

      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
      }

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
              {t("contact.successMessage")}
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
              {t("contact.errorMessage")}
            </div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors duration-300"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                {t("contact.nameLabel")}
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: true })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.name
                    ? "border-red-500 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {t("contact.nameLabel")}{" "}
                  {errors.name.type === "required"
                    ? t("contact.validation.required")
                    : t("contact.validation.invalid")}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                {t("contact.emailLabel")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.email
                    ? "border-red-500 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.type === "required"
                    ? `${t("contact.emailLabel")} ${t("contact.validation.required")}`
                    : t("contact.validation.invalidEmail")}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                {t("contact.messageLabel")}
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message", { required: true })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.message
                    ? "border-red-500 dark:border-red-700"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {t("contact.messageLabel")}{" "}
                  {errors.message.type === "required"
                    ? t("contact.validation.required")
                    : t("contact.validation.invalid")}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-white dark:text-gray-100">
                    {t("contact.sending")}
                  </span>
                </span>
              ) : (
                t("contact.submitButton")
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
