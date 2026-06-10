import './globals.css';

export const metadata = {
  title: 'Deploy Monitor Core',
  description: 'Core web para Deploy Monitor AI.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
