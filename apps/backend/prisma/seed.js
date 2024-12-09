import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('Clearing the database...');
  // Delete comments first, as they depend on posts
  await prisma.comment.deleteMany({});
  
  // Then delete posts, as they depend on users
  await prisma.post.deleteMany({});
  
  // Finally, delete users
  await prisma.user.deleteMany({});
  
  console.log('Database cleared!');
}

async function seedDatabase() {
  console.log('Seeding the database...');

  // Create some users (authors and commenters)
  const author1 = await prisma.user.create({
    data: {
      email: 'author1@example.com',
      password: 'securepassword1', // Remember to hash passwords in production
      name: 'Author One',
      role: 'AUTHOR',
    },
  });

  const author2 = await prisma.user.create({
    data: {
      email: 'author2@example.com',
      password: 'securepassword2', // Hash password in production
      name: 'Author Two',
      role: 'AUTHOR',
    },
  });

  const commenter = await prisma.user.create({
    data: {
      email: 'commenter@example.com',
      password: 'securepassword3', // Hash password in production
      name: 'Commenter One',
      role: 'COMMENTER',
    },
  });

  // Create some posts with authors
  const post1 = await prisma.post.create({
    data: {
      title: 'First Post',
      content: 'This is the first post content.',
      published: true,
      authorId: author1.id, // Link post to author1
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Second Post',
      content: 'This is the second post content.',
      published: false,
      authorId: author2.id, // Link post to author2
    },
  });

  // Create some comments with authorship
  await prisma.comment.create({
    data: {
      text: 'Great post!',
      postId: post1.id,
      userId: commenter.id, // Link comment to commenter
    },
  });

  await prisma.comment.create({
    data: {
      text: 'Very informative, thanks!',
      postId: post1.id,
      userId: author1.id, // Authors can also comment
    },
  });

  console.log('Database has been seeded!');
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
