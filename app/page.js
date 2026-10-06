'use client';
import { useState } from 'react';

export default function Home() {
  const [propertyType, setPropertyType] = useState('piso');
  const [features, setFeatures] = useState('');
  const [tone, setTone] = useState('persuasivo');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    // 1. Comprobar si el usuario ya usó su prueba gratuita
    const hasUsedFreeTrial = localStorage.getItem('inmo_free_used');

    if (hasUsedFreeTrial) {
      alert('⚠️ Has agotado tu redacción gratuita de prueba. Suscríbete al Plan Pro o Agencias para continuar generando copys ilimitados.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setGeneratedCopy(
        `¡Increíble oportunidad! Espectacular ${propertyType} recién reformado con ${features || 'excelente ubicación, máxima luminosidad y acabados de primera'}. ¡Haz tu visita hoy mismo!`
      );
      setLoading(false);

      // 2. Marcar en el navegador que ya gastó su prueba gratuita
      localStorage.setItem('inmo_free_used', 'true');
    }, 1200);
  };

  const handleCheckout = async (priceIdKey) => {
    try {
      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceIdKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Configurando pasarela de pago...');
      }
    } catch (err) {
      alert('Iniciando suscripción en Stripe...');
    }
  };

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '10px' }}>InmoCopy AI</h1>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>Generador Inteligente de Redacción Inmobiliaria</p>
      </header>

      <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Crear Anuncio Inmobiliario</h2>
        <form onSubmit={handleGenerate}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tipo de Propiedad</label>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
              <option value="piso">Piso</option>
              <option value="casa / chalet">Casa / Chalet</option>
              <option value="ático">Ático</option>
              <option value="local comercial">Local Comercial</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Características y Extras</label>
            <textarea
              rows="3"
              placeholder="Ej: 3 habitaciones, 2 baños, terraza soleada, cerca de metro..."
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tono del Copy</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
              <option value="persuasivo">Persuasivo y Vendedor</option>
              <option value="elegante">Elegante y Exclusivo</option>
              <option value="directo">Directo y Claro</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Generando Copy...' : '✨ Generar Texto de Venta (Prueba Gratuita)'}
          </button>
        </form>

        {generatedCopy && (
          <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Resultado Generado:</h3>
            <p style={{ whiteSpace: 'pre-line', color: '#1f2937' }}>{generatedCopy}</p>
            <button
              onClick={() => navigator.clipboard.writeText(generatedCopy)}
              style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' }}
            >
              📋 Copiar Texto
            </button>
          </div>
        )}
      </div>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Planes y Suscripciones</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          
          <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h3>Plan Pro (29,99€)</h3>
            <p style={{ color: '#4b5563' }}>Ideal para agentes independientes con uso ilimitado.</p>
            <button
              onClick={() => handleCheckout('PRO')}
              style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
            >
              Suscribirse a Plan Pro
            </button>
          </div>

          <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h3>Plan Agencias (79,99€)</h3>
            <p style={{ color: '#4b5563' }}>Para equipos e inmobiliarias grandes.</p>
            <button
              onClick={() => handleCheckout('AGENCIAS')}
              style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
            >
              Suscribirse a Plan Agencias
            </button>
          </div>

        </div>
      </section>
    </main>
  );
              }
                
