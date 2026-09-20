import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  for (const key of [
    "name",
    "summary",
    "description",
    "role",
    "repoUrl",
    "liveUrl",
  ] as const) {
    if (typeof body[key] === "string") data[key] = body[key].trim() || null;
  }
  if (Array.isArray(body.techStack)) data.techStack = body.techStack;
  if (Array.isArray(body.highlights)) data.highlights = body.highlights;
  if (typeof body.featured === "boolean") data.featured = body.featured;
  if (typeof body.order === "number") data.order = body.order;

  try {
    const project = await prisma.project.update({ where: { id }, data });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}
