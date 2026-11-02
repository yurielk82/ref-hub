"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="portfolio-theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
