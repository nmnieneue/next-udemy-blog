"use server";

import { saveImage } from "@/utils/image";
import { postSchema } from "@/validations/post";
import { prisma } from "../prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function createPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const topImageInput = formData.get("topImage");
  const topImage =
    topImageInput instanceof File && topImageInput.size > 0
      ? topImageInput
      : null;

  const validationResult = postSchema.safeParse({ title, content, topImage });
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const imageUrl =
    topImage instanceof File &&
    topImage.size > 0 &&
    topImage.name !== "undefined"
      ? await saveImage(topImage)
      : null;
      
  if (topImage && !imageUrl) {
    return {
      success: false,
      errors: { topImage: ["画像の保存に失敗しました"] },
    };
  }

  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }
  await prisma.post.create({
    data: {
      title,
      content,
      topImage: imageUrl,
      published: true,
      authorId: userId,
    },
  });

  redirect("/dashboard");
}
