import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./presentation/external/styled/registry/styledRegistry";
import { GlobalStyle } from "./presentation/external/styled/global";
import Footer from "./presentation/shared/layout/Footer";

export const metadata: Metadata = {
  title: "Desafio Aiko",
  description: "Desafio Aiko!",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <StyledComponentsRegistry>
        {children}
      </StyledComponentsRegistry>
      <GlobalStyle />
      <Footer/>
      </body>
    </html>
  );
}
