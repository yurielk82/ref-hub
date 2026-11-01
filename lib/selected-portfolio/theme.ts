import tokens from "../../data/selected-portfolio/theme.json";
import {
  createThemeCss,
  createSignalPaletteGLSL,
} from "../../scripts/selected-portfolio/theme.mjs";

const materialCss = `:root{--material-paper:${tokens.light.paper};--material-ink:${tokens.light.ink};--material-muted:${tokens.light.mutedInk};--material-subtle:${tokens.light.subtleInk};--material-line:${tokens.light.line};--material-wash:${tokens.light.wash};--material-accent:${tokens.light.accent};}`;
export const themeCss = createThemeCss(tokens) + materialCss;
export const signalPaletteGLSL = createSignalPaletteGLSL(tokens);
