import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Setting({
  session,
  headerType,
}: {
  session: Session;
  headerType: string;
}) {
  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="font-medium hover:bg-white focus:bg-white cursor-pointer"
        >
          {session.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={headerType === "public" ? "center": "end"} className="w-48">
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={headerType === "public" ? "/dashboard" : "/"}>
            {headerType === "public" ? "記事一覧" : "トップページ"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
