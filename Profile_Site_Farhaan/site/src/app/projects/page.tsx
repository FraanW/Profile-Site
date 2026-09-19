import type { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/ProjectsPage";

export const metadata: Metadata = {
  // DRAFT copy, pending Lefler.
  title: "Projects · Muhammad Farhaan",
  description: "Every project as a node card: stack, proof figures, links.",
};

export default function Projects() {
  return <ProjectsPage />;
}
