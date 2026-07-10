import type { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/ProjectsPage";

export const metadata: Metadata = {
  // PLACEHOLDER copy, pending intake and Lefler.
  title: "Projects · Shama Anjum",
  description: "Every project as a star card. Placeholder content, pending intake.",
};

export default function Projects() {
  return <ProjectsPage />;
}
