import type { Metadata, Viewport } from "next";
import "./styles/main.css";
import "./styles/scrollbar.css";

export const metadata: Metadata = {
  title: "CDT",
  description: "Centro de Datos",
};

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
