
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Merriweather } from "next/font/google";
import { shadesOfPurple } from "@clerk/themes";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs'
import {neobrutalism} from "@clerk/themes";
import { Toaster } from 'sonner';

const inter = Merriweather({
  subsets: ['latin', 'cyrillic'],
  weight: "300"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme:neobrutalism }} >


    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className,
                "bg-white dark:bg-black")}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="stream"
          >
              <Toaster theme="light" position="bottom-center" />
        {children}
        </ThemeProvider>
        </body>
    </html>

    </ClerkProvider>
  );
}
