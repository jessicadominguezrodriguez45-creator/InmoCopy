export const metadata = {
  title: 'InmoCopy.ai',
  description: 'Plataforma de generación de copy inmobiliario',
other: { 
'google-site-verification' : "3NUcMA8b8mi7_vCOawMajHtSdSX9hY4AsfpjzJttLE4" }, 
},

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
