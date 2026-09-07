import { notFound } from "next/navigation";
import projects from "@/data/projects";
import ProjectDetailClient from "@/components/ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => String(p.id) === params.id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }) {
  const project = projects.find((p) => String(p.id) === params.id);
  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
