import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@/auth";
import Setting from "./Setting";

export default async function PrivateHeader() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("不正なリクエストです");
  }

  return (
    <header className="border-b bg-white-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
                <NavigationMenuLink asChild>
                  <Link
                    href="/dashboard"
                    className="font-bold text-lg hover:bg-white focus:bg-white"
                  >
                    管理ページ
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} headerType="private" />
      </div>
    </header>
  );
}
