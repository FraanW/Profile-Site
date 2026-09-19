/** Identity facts. Every value traces to context/profile.md (the truth ledger). */

export const identity = {
  name: "Muhammad Farhaan",
  /** Top-bar mono name (blueprint §6.1). */
  shortName: "farhaan",
  location: "Chennai, India",
  emails: {
    /** Primary mailto (owner-confirmed 2026-07-10). */
    primary: "mdfarhaanhere@gmail.com",
    work: "farhaan@theproductcreator.com",
  },
  github: { label: "github.com/FraanW", href: "https://github.com/FraanW" },
  linkedin: {
    label: "linkedin.com/in/muhammadfarhaan",
    href: "https://www.linkedin.com/in/muhammadfarhaan",
  },
  /** Footer one-line core stack (mono), from the ledger's skills inventory. */
  stackLine: "typescript · react · next.js · fastapi · postgres · aws",
} as const;
