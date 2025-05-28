"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchBox from "../post/SearchBox";
import { FiSearch } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { Session } from "next-auth";

export default function PublicHeader({ session }: { session: Session | null }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b bg-white-200 relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <div className="flex items-center gap-2">
                  <NavigationMenuLink asChild className="p-0">
                    <Link href="/" className="hover:bg-white focus:bg-white">
                      <Image
                        src="/image.jpeg"
                        alt="logo"
                        width={0}
                        height={0}
                        sizes="100px"
                        className="w-[100px]"
                      />
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="sm:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-xl p-2"
            >
              <FiSearch />
            </button>
          </div>
          <div className="hidden sm:block">
            <SearchBox />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!session?.user ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button asChild>
                <Link href="/register">登録</Link>
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="hover:bg-white focus:bg-white text-sm"
              >
                {session?.user?.name}
              </Link>
              <Button asChild>
                <Link href="/manage/posts/create">
                  <MdEdit className="inline-block" />
                  投稿
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center px-4">
          <SearchBox />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-4 text-xl"
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
}
