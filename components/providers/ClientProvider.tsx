"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "./ThemeProvider";
import QueryProvider from "./QueryProvider";

export function ClientProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
