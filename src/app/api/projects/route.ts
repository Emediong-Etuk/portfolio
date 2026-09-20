import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Project name is required" }, { status: 400 });
  }
  if (typeof body.repoUrl !== "string" || !body.repoUrl.trim()) {
    return NextResponse.json({ error: "Repo URL is required" }, { status: 400 });
  }

  const baseSlug = slugify(body.slug || body.name);
  let slug = baseSlug || `project-${Date.now()}`;
  let suffix = 1;
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const maxOrder = await prisma.project.aggregate({ _max: { order: true } });

  const project = await prisma.project.create({
    data: {
      slug,
      name: body.name.trim(),
      summary: body.summary?.trim() || "",
      description: body.description?.trim() || "",
      role: body.role?.trim() || null,
      techStack: Array.isArray(body.techStack) ? body.techStack : [],
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      repoUrl: body.repoUrl.trim(),
      liveUrl: body.liveUrl?.trim() || null,
      featured: body.featured ?? true,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
