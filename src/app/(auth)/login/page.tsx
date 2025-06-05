import Link from "next/link";
import Image from "next/image";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="container flex flex-col items-center mx-auto space-y-6">
      <Link href="/" className="hover:bg-white focus:bg-white mr-1">
        <Image
          src="/image.jpeg"
          alt="logo"
          width={0}
          height={0}
          sizes="150px"
          className="w-[150px]"
          priority
        />
      </Link>
      <LoginForm />
    </div>
  );
}
