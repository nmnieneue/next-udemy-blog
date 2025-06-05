"use client";

import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { createUser } from "@/lib/actions/createUser";

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-bold text-xl">ユーザー登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input type="text" id="name" name="name" required />
            {state.errors.name && (
              <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" id="email" name="email" required />
            {state.errors.email && (
              <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input type="password" id="password" name="password" required />
            {state.errors.password && (
              <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード(確認用)</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
            {state.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            登録
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
