interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

// Base64 do ícone de email em branco
const EMAIL_ICON_BASE64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADT0lEQVR4nO2ZW2xMURSGV7wgxC0SJC458YCIPHjwIEoQJEJCkKgIEhEvJBJBQkiEiEQiIURIRNzafY5SHTpHO1MdVVVpadfZu6PWmTNTqpSZ6eyz1zlNnGSS6Zzz7/Wdf6+99tpnBgbG7J8wYBaQD5wG6oEW4DvQDXQBn4Fm4BlwD6gE1gPhge7zXw2YDhQCT4EfGusHUAcsA8IC0WcIsBSo1gxcAXYDs4HxwAQgFogGooAIIBGYD2wHLgLtwFdgbSD6jAPOAb+AJmATMM5hvwOBVOAG8APoALL93V8CcAf4CRwBwmz2GwKsBxqBXiDPn/1NBR4AvcB+wOXnmHEaqAQm+aO/MOA60ANk+juWgwdQBkT6OlYUcAvoA7b4O3gvS1UCTPRlvGlAHfATyApU8F62UgVM8UXMOcBH4DuQEejgvWwlEjnWm/GmAC+AH8DyYAneaxZu2425GHgH9AArQiF4LztpBBbYiZkKvLUSVzCsEKhwMPYk4KmVyLEBKAcKHPYRDlRZM5EUbMF7zUKlg5hxwH0rcaUGY/BeNnLRZszZQIuVyFKDNXgvG7lhI2YG0G4lsnwJxuC9bOSWjZi5VhJLDebgvWzkro2YB6xELg724L1s5IGNmMesRC4NheC9bOSJjZi1ViKXh0rwXjbyDJhuI2a9lciVoRS8l400ANNsxGyyErkqlIL3spFmYKaNmB+sRK4OpeC9bKQVmG0jZoeVyLWhFLyXjXwC5tiI+cVK5LpQCt7LRr4C823E7LYSeUMoBe9lIz3AQhsxe61E3hRKwXvZSB+wxEbMPiuRt4RS8F42IrVCqo2Y/VYibw2l4L1sRGqFNBsx5ViEHPxvD6XgvWxEaoXFNmIOWolcGkrBe9mI1ArLbMQ8YiVyWSgF72UjUiustBGz3ErkilAK3stGpFZYYyNmpZXI1aEUvJeNSK2w3kbMaiuRa0IpeC8bkVphk42Yt61Erg+l4L1sRGqFLTZi3rUSuTGUgveyEakVcmzEbLQSuSmUgveyEakV8mzEbLYS+V4oBe9lI1Ir7LQRs8VK5AehFLyXjUitsNdGzFYrkR+GUvBeNiK1wgEbMdustkd+HErBe9mI1AqHbMRst9oeuQkYGDNn/2X7A6iNJ/S8MHrEAAAAAElFTkSuQmCC";

export function generateContactEmailHtml({
  name,
  email,
  message,
}: ContactEmailProps) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova mensagem de contato</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f3f3f3;
          }
					.top-container {
						background-color: #f3f3f3;
						width: 100%;
						padding-top: 20px;
						padding-bottom: 20px;
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
					}
          .container {
            max-width: 600px;
            margin: 0 auto;
						background-color: #ffffff;
          }
          .header {
            background-color: #FF7B5F;
            text-align: center;
            padding: 40px 20px;
          }
          .email-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto;
            display: block;
          }
          .content {
            padding: 40px 20px;
            text-align: center;
          }
          .title {
            color: #000000;
            font-size: 36px;
            font-weight: 700;
            margin: 0 0 24px 0;
          }
          .description {
            color: #4A4A4A;
            font-size: 16px;
            line-height: 1.6;
            margin: 0 auto 32px auto;
            max-width: 480px;
          }
          .message-details {
            background-color: #F8F8F8;
            border-radius: 8px;
            padding: 24px;
            margin: 0 20px;
            text-align: left;
          }
          .field {
            margin-bottom: 16px;
          }
          .field:last-child {
            margin-bottom: 0;
          }
          .field-label {
            color: #6B6B6B;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .field-value {
            color: #2D2D2D;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
				<div class="top-container">
					<div class="container">
						<div class="header">
							<img src="${EMAIL_ICON_BASE64}" alt="Email icon" class="email-icon">
						</div>
						
						<div class="content">
							<h1 class="title">Nova mensagem de contato</h1>
							<p class="description">
								Você recebeu uma nova mensagem através do formulário de contato do seu site.
							</p>
							
							<div class="message-details">
								<div class="field">
									<div class="field-label">Nome</div>
									<div class="field-value">${name}</div>
								</div>
								
								<div class="field">
									<div class="field-label">Email</div>
									<div class="field-value">${email}</div>
								</div>
								
								<div class="field">
									<div class="field-label">Mensagem</div>
									<div class="field-value">${message}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
      </body>
    </html>
  `;
}

// Versão em texto plano para clientes que não suportam HTML
export function generateContactEmailText({
  name,
  email,
  message,
}: ContactEmailProps) {
  return `
Nova mensagem de contato recebida:

Nome: ${name}
Email: ${email}

Mensagem:
${message}

---
Esta mensagem foi enviada através do formulário de contato do seu site.
  `.trim();
}
