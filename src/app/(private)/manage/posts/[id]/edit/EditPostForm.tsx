"use client";
import { useState, useActionState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github-dark.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updatePost } from "@/lib/actions/updatePost";

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    content: string;
    topImage?: string | null;
    published: boolean;
  };
};

export default function EditPostForm({ post }: EditPostFormProps) {
  const [content, setContent] = useState(post.content);
  const [contentLength, setContentLength] = useState(post.content.length);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);
  const [imagePreview, setImagePreview] = useState(post.topImage);

  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {},
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== post.topImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, post.topImage]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">記事編集画面(Markdown対応)</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="title" className="mb-2">
            タイトル
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {state.errors.title && (
            <p className="text-red-500 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>
        <div>
          <Label htmlFor="topImage" className="mb-2">
            トップ画像
          </Label>
          <Input
            type="file"
            id="topImage"
            accept="image/*"
            name="topImage"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt={post.title}
                width={0}
                height={0}
                sizes="200px"
                className="w-[200px]"
                priority
              />
            </div>
          )}
          {state.errors.topImage && (
            <p className="text-red-500 text-sm mt-1">{state.errors.topImage}</p>
          )}
        </div>
        <div>
          <Label htmlFor="content" className="mb-2">
            内容(Markdown)
          </Label>
          <TextareaAutosize
            id="content"
            name="content"
            className="w-full border p-2"
            minRows={8}
            placeholder="Markdown形式で入力してください"
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className="text-red-500 text-sm mt-1">{state.errors.content}</p>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">
          文字数; {contentLength}
        </div>
        <Button type="button" onClick={() => setPreview(!preview)}>
          {preview ? "プレビューを閉じる" : "プレビューを開く"}
        </Button>
        {preview && (
          <div className="border p-4 bg-gray-50 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false} // HTMLスキップを無効化
              unwrapDisallowed={true} // Markdownの改行を解釈
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <RadioGroup
          value={published.toString()}
          name="published"
          onValueChange={(value) => setPublished(value === "true")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="published-one" />
            <Label htmlFor="published-one">表示</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="published-two" />
            <Label htmlFor="published-two">非表示</Label>
          </div>
        </RadioGroup>

        <div>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            投稿する
          </Button>
        </div>
        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldImageUrl" value={post.topImage || ""} />
      </form>
    </div>
  );
}
