const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create some posts
  const post1 = await prisma.post.create({
    data: {
      title: 'First Post',
      content: 'This is the first post content.',
      published: true,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Second Post',
      content: 'This is the second post content.',
      published: false,
    },
  });

  // Create some comments
  await prisma.comment.create({
    data: {
      text: 'Great post!',
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: 'Very informative, thanks!',
      postId: post1.id,
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
