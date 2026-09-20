import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.orderedIds)) {
    return NextResponse.json({ error: "orderedIds array required" }, { status: 400 });
  }

  await prisma.$transaction(
    body.orderedIds.map((id: string, index: number) =>
      prisma.project.update({ where: { id }, data: { order: index } })
    )
  );

  return NextResponse.json({ ok: true });
}
