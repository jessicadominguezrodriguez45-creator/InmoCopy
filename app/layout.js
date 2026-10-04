export const metadata = {
  title: 'InmoCopy.ai',
  description: 'Plataforma de generación de copy inmobiliario',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="google-site-verification" content="3NUcMA8b8mi7_vC0awMajHtSdSX9H9Y4AsfpjzJttLE4" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
