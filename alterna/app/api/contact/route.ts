import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Configurar transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verificar configuración
    await transporter.verify();

    // Email para el restaurante
    await transporter.sendMail({
      from: `"Formulario de Contacto" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Nuevo mensaje de contacto</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
          </p>
        </div>
      `,
    });

    // Email de confirmación para el usuario (opcional)
    await transporter.sendMail({
      from: `"${process.env.CONTACT_EMAIL_NAME || 'Tu Restaurante'}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Hemos recibido tu mensaje',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">¡Gracias por contactarnos, ${name}!</h2>
          <p>Hemos recibido tu mensaje y te responderemos a la brevedad.</p>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Resumen de tu mensaje:</strong></p>
            <p>${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
          </div>
          <p style="color: #6b7280;">
            Atentamente,<br>
            El equipo de tu restaurante
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Mensaje enviado con éxito' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error enviando email:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor, intenta nuevamente.' },
      { status: 500 }
    );
  }
}