import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container flex flex-col items-center mx-auto space-y-6">
      <Link href="/" className="hover:bg-white focus:bg-white mr-1">
        <Image src="/image.jpeg" alt="logo" width={150} height={0} />
      </Link>
      <LoginForm />
    </div>
  );
}
