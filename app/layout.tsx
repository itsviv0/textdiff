import type { Metadata } from "next";
import { Roboto_Mono, Space_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
});

const spaceMono = Space_Mono({
    variable: "--font-space-mono",
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "TextDiff",
    description:
        "A simple text diff checker built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${spaceMono.variable} ${robotoMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
