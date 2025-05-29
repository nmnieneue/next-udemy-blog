"use client";
import { useState, useActionState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github-dark.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/actions/createPost";
import ImageForm from "@/components/post/ImageForm";
import PostVisibilityRadioGroup from "@/components/post/PostVisibilityRadioGroup";

export default function CreatePage() {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [published, setPublished] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction] = useActionState(createPost, {
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

  const handleImageDelete = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事投稿(Markdown対応)</h1>
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
          imagePreview={imagePreview}
          error={state.errors.topImage}
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
              skipHtml={false} // HTMLスキップを無効化
              unwrapDisallowed={true} // Markdownの改行を解釈
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <PostVisibilityRadioGroup
          published={published}
          setPublished={setPublished}
        />
        <div>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            投稿する
          </Button>
        </div>
      </form>
    </div>
  );
}
