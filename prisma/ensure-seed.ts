import { PrismaClient } from "@prisma/client";
import { profileData, servicesData, skillsData, projectsData } from "./seed-data";

const prisma = new PrismaClient();

/**
 * Safe to run on every deploy: only seeds tables that are still empty,
 * so it never overwrites content edited through /admin after the first
 * deploy. This is what runs automatically as part of the Render build.
 */
async function main() {
  if ((await prisma.profile.count()) === 0) {
    await prisma.profile.create({ data: profileData });
    console.log("Seeded profile.");
  }
  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({ data: servicesData });
    console.log("Seeded services.");
  }
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({ data: skillsData });
    console.log("Seeded skills.");
  }
  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({ data: projectsData });
    console.log("Seeded projects.");
  }
  console.log("ensure-seed done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
