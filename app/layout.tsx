import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.variable}
        suppressHydrationWarning={true}>
        <AuthProvider>
          <Theme
            // appearance="light"  // causes Extra Attributes warning in the console
            accentColor="violet">
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
            {/* <ThemePanel/> */}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
