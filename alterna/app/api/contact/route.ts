import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes' },
        { status: 400 }
      );
    }

    // Aquí puedes integrar con un servicio de email como:
    // - SendGrid
    // - Resend
    // - Nodemailer
    // O guardar en Strapi

    console.log('📧 Nuevo mensaje de contacto:', {
      name,
      email,
      phone,
      message,
    });

    // Por ahora solo logueamos
    // TODO: Implementar envío de email real

    return NextResponse.json(
      { message: 'Mensaje recibido' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error procesando contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}