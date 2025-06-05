import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import { getPost } from "@/lib/post";
import { auth } from "@/auth";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto pt-0 gap-0">
        {post.topImage ? (
          <div className="relative w-full h-64 lg:h-96">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        ) : (
          <div className="relative w-full h-64 lg:h-96 bg-white rounded-xl" />
        )}
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500 pt-6">
              投稿者: {post.author.name}
            </p>
            <time className="text-sm text-gray-500 pt-6">
              {format(new Date(post.createdAt), "yyyy年MM月dd日", {
                locale: ja,
              })}
            </time>
          </div>
          {userId === post.authorId && (
            <div className="flex pb-1">
              <Button asChild variant="outline">
                <Link
                  href={`/manage/posts/${post.id}/edit`}
                  className="cursor-pointer ml-auto"
                >
                  編集
                </Link>
              </Button>
            </div>
          )}
          <CardTitle className="text-3xl font-bold pb-6">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
