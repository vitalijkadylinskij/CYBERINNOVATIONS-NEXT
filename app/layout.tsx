import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: {
    default: "Cyber Innovation — IT решения и цифровая трансформация",
    template: "%s | Cyber Innovation",
  },

  description:
    "Cyber Innovation — разработка IT решений, кибербезопасность и внедрение инновационных технологий для бизнеса.",

  keywords: [
    "IT решения",
    "кибербезопасность",
    "цифровая трансформация",
    "разработка ПО",
  ],

  openGraph: {
    title: "Cyber Innovation — IT решения нового поколения",
    description:
      "Разработка, кибербезопасность и инновационные технологии для бизнеса.",
    siteName: "Cyber Innovation",
    images: [
      {
        url: "/logos/Logo-ACI-RUS.ver2.svg", // локальное изображение из public
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
