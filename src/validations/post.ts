import { z } from "zod";
export const postSchema = z.object({
  title: z
    .string()
    .min(3, { message: "タイトルは3文字以上で入力してください" })
    .max(255, { message: "タイトルは255文字以内で入力してください" }),
  content: z
    .string()
    .min(10, { message: "内容は10文字以上で入力してください" }),
  topImage: z
    .custom(
      (file) => {
        if (!file) return true;
        if (file.size > 5 * 1024 * 1024) {
          return false;
        }
        return true;
      },
      { message: "画像ファイルは5MB以下である必要があります" }
    )
    .nullable()
    .optional(),
});
