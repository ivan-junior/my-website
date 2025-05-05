import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createContactFormSchema } from "@/schemas/contact";
import {
  generateContactEmailHtml,
  generateContactEmailText,
} from "@/emails/contact-template";

// Traduções padrão para validação na API
const defaultTranslations = {
  "contact.validation.nameRequired": "Nome é obrigatório",
  "contact.validation.nameMaxLength": "Nome deve ter no máximo 100 caracteres",
  "contact.validation.emailRequired": "Email é obrigatório",
  "contact.validation.invalidEmail": "Formato de email inválido",
  "contact.validation.messageRequired": "Mensagem é obrigatória",
  "contact.validation.messageMaxLength":
    "Mensagem deve ter no máximo 1000 caracteres",
} as const;

// Função de tradução simplificada para a API
const t = (key: string) =>
  defaultTranslations[key as keyof typeof defaultTranslations] || key;

// Schema com traduções em português
const apiContactFormSchema = createContactFormSchema(t);

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = new URL(request.url);
    const origin = url.origin;

    // Validação dos dados recebidos
    const result = apiContactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          errors: result.error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    if (!process.env.RESEND_TO_EMAIL) {
      throw new Error("RESEND_TO_EMAIL is not defined");
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL,
      replyTo: email,
      subject: `Nova mensagem de contato de ${name} via site`,
      html: generateContactEmailHtml({ name, email, message, origin }),
      text: generateContactEmailText({ name, email, message, origin }), // Fallback para clientes que não suportam HTML
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Error sending email",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
