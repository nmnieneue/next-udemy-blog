"use server";

import { prisma } from "../prisma";

export async function deleteImage(postId: string): Promise<void> {
  await prisma.post.update({
    where: { id: postId },
    data: { topImage: null },
  });
}
