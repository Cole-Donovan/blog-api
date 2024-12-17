import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('Clearing the database...');
  // Delete comments first, as they depend on posts
  await prisma.comment.deleteMany({});
  
  // Then delete posts
  await prisma.post.deleteMany({});
  
}

async function seedDatabase() {
  console.log('Seeding the database...');

  // Assuming users already exist in the database
  const author1 = await prisma.user.findUnique({
    where: { email: 'author1@example.com' },
  });

  const author2 = await prisma.user.findUnique({
    where: { email: 'author2@example.com' },
  });

  if (!author1 || !author2) {
    throw new Error('Required authors are missing from the database.');
  }

  // Create posts
  await prisma.post.create({
    data: {
      title: 'First Post',
      content: 'This is the first post content.',
      published: true,
      authorId: author1.id, // Link post to author1
    },
  });

  await prisma.post.create({
    data: {
      title: 'Second Post',
      content: 'This is the second post content.',
      published: false,
      authorId: author2.id, // Link post to author2
    },
  });

  console.log('Database has been seeded with posts!');
}

async function main() {
  // Clear the database
  await clearDatabase();

  // Seed the database
  await seedDatabase();

  // Disconnect Prisma client
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    prisma.$disconnect();
  });
