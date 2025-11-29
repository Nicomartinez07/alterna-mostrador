'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Hubo un error al enviar el mensaje');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Error de conexión. Por favor, intenta nuevamente.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
          placeholder="Tu nombre completo"
          disabled={status === 'loading'}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
          placeholder="tu@email.com"
          disabled={status === 'loading'}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
          placeholder="+34 600 000 000"
          disabled={status === 'loading'}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
          placeholder="Escribe tu mensaje aquí..."
          disabled={status === 'loading'}
        />
      </div>

      {/* Status messages */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <strong>¡Mensaje enviado con éxito!</strong>
          <p className="mt-1">Te hemos enviado un email de confirmación. Te responderemos pronto.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <strong>Error al enviar el mensaje</strong>
          <p className="mt-1">{errorMessage}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
      >
        {status === 'loading' ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-6 h-6" />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  );
}