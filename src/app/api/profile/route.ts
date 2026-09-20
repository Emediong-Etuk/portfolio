import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { githubAvatarUrl } from "@/lib/github";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const profile = await prisma.profile.findFirst();
  if (!profile) {
    return NextResponse.json({ error: "No profile exists" }, { status: 404 });
  }

  const data: Record<string, unknown> = {};
  for (const key of [
    "name",
    "role",
    "tagline",
    "bio",
    "githubUsername",
    "githubUrl",
    "contactEmail",
    "location",
  ] as const) {
    if (typeof body[key] === "string") data[key] = body[key].trim() || null;
  }

  if (body.avatarMode === "github") {
    const username =
      (typeof body.githubUsername === "string" && body.githubUsername.trim()) ||
      profile.githubUsername;
    data.avatarUrl = githubAvatarUrl(username);
    data.avatarSource = "GITHUB";
  } else if (body.avatarMode === "custom" && typeof body.avatarUrl === "string") {
    const url = body.avatarUrl.trim();
    if (url) {
      data.avatarUrl = url;
      data.avatarSource = "CUSTOM";
    }
  }

  const updated = await prisma.profile.update({
    where: { id: profile.id },
    data,
  });

  return NextResponse.json(updated);
}
