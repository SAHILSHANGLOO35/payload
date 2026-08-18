import { pdfThemes } from "./pdf-theme"
import type { PdfThemeKey } from "./pdf-theme"

export function getPdfTheme(template: string) {
  return pdfThemes[template as PdfThemeKey] ?? pdfThemes.default
}
