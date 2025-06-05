import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";

import { auth } from "@/auth";
import { getOwnPosts } from "@/lib/ownPost";
import PostDropdownMenu from "@/components/post/PostDropdownMenu";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }

  const posts = await getOwnPosts(userId);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">記事一覧</h1>
        <Button asChild>
          <Link href="/manage/posts/create">新規記事作成</Link>
        </Button>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">タイトル</th>
            <th className="border p-2 text-center">表示 / 非表示</th>
            <th className="border p-2 text-center">更新日時</th>
            <th className="border p-2 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2 text-center">
                {post.published ? "表示" : "非表示"}
              </td>
              <td className="border p-2 text-center">
                {format(new Date(post.updatedAt), "yyyy年MM月dd日 HH:mm", {locale: ja})}
              </td>
              <td className="border p-2 text-center">
                <PostDropdownMenu postId={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
