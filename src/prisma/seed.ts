import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // User 데이터 추가
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'user1@example.com',
        password: 'password123',
        username: 'user1',
        blog_url: 'https://blog1.com',
      },
      {
        email: 'user2@example.com',
        password: 'password123',
        username: 'user2',
        blog_url: 'https://blog2.com',
      },
      {
        email: 'user3@example.com',
        password: 'password123',
        username: 'user3',
        blog_url: null,
      },
    ],
  });

  console.log(`${users.count} users added`);

  // Bookmark 데이터 추가
  const bookmarks = await prisma.bookmark.createMany({
    data: [
      { bookmark_folder_name: 'Tech Articles', user_id: 1 },
      { bookmark_folder_name: 'My Favorite Posts', user_id: 1 },
      { bookmark_folder_name: 'Learning Resources', user_id: 2 },
    ],
  });

  console.log(`${bookmarks.count} bookmarks added`);

  // Post 데이터 추가
  const posts = await prisma.post.createMany({
    data: [
      {
        title: 'Introduction to Prisma',
        url: 'https://blog1.com/prisma-intro',
        author: 'user1',
        platform: 'VELOG',
        date: new Date('2024-12-01T10:00:00.000Z'),
        score: 4.5,
        thumbnail_url: 'https://example.com/thumb1.jpg',
      },
      {
        title: 'Docker vs Podman',
        url: 'https://blog2.com/docker-podman',
        author: 'user2',
        platform: 'TISTORY',
        date: new Date('2024-11-25T15:30:00.000Z'),
        score: 4.0,
        thumbnail_url: 'https://example.com/thumb2.jpg',
      },
      {
        title: 'Setting up a GitHub Action',
        url: 'https://blog1.com/github-actions',
        author: 'user1',
        platform: 'GITBLOG',
        date: new Date('2024-11-20T12:45:00.000Z'),
        score: 5.0,
        thumbnail_url: null,
      },
    ],
  });

  console.log(`${posts.count} posts added`);

  // Keyword 데이터 추가
  const keywords = await prisma.keyword.createMany({
    data: [{ keyword: 'Prisma' }, { keyword: 'Docker' }, { keyword: 'CI/CD' }],
  });

  console.log(`${keywords.count} keywords added`);

  // BookmarkPosts 관계 데이터 추가
  await prisma.bookmark.update({
    where: { bookmark_id: 1 },
    data: {
      posts: { connect: [{ post_id: 1 }, { post_id: 2 }] },
    },
  });

  await prisma.bookmark.update({
    where: { bookmark_id: 2 },
    data: {
      posts: { connect: [{ post_id: 3 }] },
    },
  });

  console.log(`Bookmark-Post relations added`);

  // KeywordPosts 관계 데이터 추가
  await prisma.post.update({
    where: { post_id: 1 },
    data: {
      keywords: { connect: [{ keyword_id: 1 }] },
    },
  });

  await prisma.post.update({
    where: { post_id: 2 },
    data: {
      keywords: { connect: [{ keyword_id: 2 }] },
    },
  });

  await prisma.post.update({
    where: { post_id: 3 },
    data: {
      keywords: { connect: [{ keyword_id: 3 }] },
    },
  });

  console.log(`Keyword-Post relations added`);

  // Follow 데이터 추가
  const follows = await prisma.follow.createMany({
    data: [
      { follw_folder_name: 'My Tech Blogs', user_id: 1 },
      { follw_folder_name: 'Inspiration', user_id: 2 },
      { follw_folder_name: 'Competitors', user_id: 3 },
    ],
  });

  console.log(`${follows.count} follows added`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
