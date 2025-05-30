"use client";
import { useState, useActionState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github-dark.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatePost } from "@/lib/actions/updatePost";
import ImageForm from "@/components/post/ImageForm";
import { deleteImage } from "@/lib/actions/deleteImage";
import PostVisibilityRadioGroup from "@/components/post/PostVisibilityRadioGroup";
import DeletePostButton from "@/components/post/DeletePostButton";

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
  const [oldImageUrl, setOldImageUrl] = useState(post.topImage || "");
  const [imageError, setImageError] = useState<string[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (file.size > 5 * 1024 * 1024) {
        setImageError(["画像ファイルは5MB以下である必要があります"]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
      setImageError(null);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleImageDelete = async () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    await deleteImage(post.id);
    setOldImageUrl("");
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
        <ImageForm
          imagePreview={imagePreview as string | null}
          error={imageError || state.errors.topImage}
          fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
        />
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
          文字数: {contentLength}
        </div>
        <Button type="button" onClick={() => setPreview(!preview)}>
          {preview ? "プレビューを閉じる" : "プレビューを開く"}
        </Button>
        {preview && (
          <div className="border p-4 bg-gray-50 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <PostVisibilityRadioGroup
          published={published}
          setPublished={setPublished}
        />
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            更新する
          </Button>
          <DeletePostButton postId={post.id} />
        </div>
        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldImageUrl" value={oldImageUrl} />
      </form>
    </div>
  );
}
