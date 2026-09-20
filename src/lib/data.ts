import { prisma } from "@/lib/db";

export async function getProfile() {
  const profile = await prisma.profile.findFirst();
  if (!profile) {
    throw new Error(
      "No profile found. Run `npm run db:seed` to create the initial profile."
    );
  }
  return profile;
}

export async function getServices() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}
