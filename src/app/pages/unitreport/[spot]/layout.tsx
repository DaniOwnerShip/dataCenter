import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informe",
};

export default function SpotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
