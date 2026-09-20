import { PrismaClient } from "@prisma/client";
import { profileData, servicesData, skillsData, projectsData } from "./seed-data";

const prisma = new PrismaClient();

/**
 * Destructive full reset — wipes and re-seeds everything.
 * For local/dev use only. In production, use `npm run db:ensure-seed`
 * instead so it doesn't wipe edits made through /admin.
 */
async function main() {
  await prisma.profile.deleteMany();
  await prisma.profile.create({ data: profileData });

  await prisma.service.deleteMany();
  await prisma.service.createMany({ data: servicesData });

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({ data: skillsData });

  await prisma.project.deleteMany();
  await prisma.project.createMany({ data: projectsData });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
