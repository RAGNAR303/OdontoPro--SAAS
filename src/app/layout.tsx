import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionAuthProvider } from "@/components/session-auth";
import { Toaster } from "sonner";
import QueryClientContext from "@/providers/client-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdontoPro",
  description: "Encontre os melhores profissionais em um único local!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <SessionAuthProvider>
          <QueryClientContext>
            <Toaster expand duration={2500} position="top-right" richColors />
            {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
