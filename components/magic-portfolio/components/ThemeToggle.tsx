"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton, useTheme } from "@once-ui-system/core";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setCurrentTheme(
      document.documentElement.getAttribute("data-theme") || "light",
    );
  }, []);

  useEffect(() => {
    setCurrentTheme(
      document.documentElement.getAttribute("data-theme") || "light",
    );
  }, [theme]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => {
        setTheme(nextTheme);
        try {
          localStorage.setItem("theme", nextTheme);
        } catch {}
      }}
      aria-label={
        nextTheme === "dark" ? "다크 모드로 전환" : "라이트 모드로 전환"
      }
    />
  );
};
