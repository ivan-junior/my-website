import { z } from "zod";

// Função que cria o schema com base nas traduções
export const createContactFormSchema = (t: (key: string) => string) => {
  return z.object({
    name: z
      .string()
      .min(1, t("contact.validation.nameRequired"))
      .max(100, t("contact.validation.nameMaxLength")),
    email: z
      .string()
      .min(1, t("contact.validation.emailRequired"))
      .email(t("contact.validation.invalidEmail")),
    message: z
      .string()
      .min(1, t("contact.validation.messageRequired"))
      .max(1000, t("contact.validation.messageMaxLength")),
  });
};

// Tipo do formulário
export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};
