export const metadata = {
  title: 'InmoCopy.ai',
  description: 'Plataforma de generación de copy inmobiliario',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
