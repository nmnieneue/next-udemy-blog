import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 12);
  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2/600/400",
  ];

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      posts: {
        create: [
          {
            title: "初めてのブログ投稿",
            content: "これは最初のブログ投稿です。",
            topImage: dummyImages[0] || "",
            published: true,
          },
          {
            title: "2番目のブログ投稿",
            content: "これは2つ目のブログ投稿です。",
            topImage: dummyImages[1] || "",
            published: true,
          },
        ],
      },
    },
  });
  console.log({ user });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
