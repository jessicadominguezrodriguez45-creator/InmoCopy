'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://accjbkibebvqmwupihtv.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Se deshabilita el envío de email de confirmación desde la llamada del cliente
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        shouldCreateUser: true,
        data: {}
      }
    });

    setLoading(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      // Si el usuario se creó correctamente
      if (data?.user) {
        setMessage('¡Cuenta creada correctamente! Ya puedes iniciar sesión.');
      } else {
        setMessage('¡Registro completado!');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Crear Cuenta en InmoCopy</h2>
      <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="******"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '4px' }}>
          {message}
        </p>
      )}
    </div>
  );
}
