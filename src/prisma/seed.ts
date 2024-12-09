import { Platform, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // **1. User 데이터 추가**
  const users = [
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
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      await prisma.user.create({ data: user });
      console.log(`User ${user.email} added.`);
    } else {
      console.log(`User ${user.email} already exists.`);
    }
  }

  // **2. Bookmark 데이터 추가**
  const bookmarks = [
    { bookmark_folder_name: 'Tech Articles', user_id: 1 },
    { bookmark_folder_name: 'My Favorite Posts', user_id: 1 },
    { bookmark_folder_name: 'Learning Resources', user_id: 2 },
  ];

  for (const bookmark of bookmarks) {
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        bookmark_folder_name: bookmark.bookmark_folder_name,
        user_id: bookmark.user_id,
      },
    });

    if (!existingBookmark) {
      await prisma.bookmark.create({ data: bookmark });
      console.log(`Bookmark "${bookmark.bookmark_folder_name}" added.`);
    } else {
      console.log(
        `Bookmark "${bookmark.bookmark_folder_name}" already exists.`,
      );
    }
  }

  // **3. Post 데이터 추가**
  const posts = [
    {
      title: 'Introduction to Prisma',
      url: 'https://blog1.com/prisma-intro',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-12-01T10:00:00Z'),
      score: 4.5,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Docker vs Podman',
      url: 'https://blog2.com/docker-podman',
      author: 'user2',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-25T15:30:00Z'),
      score: 4.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
    {
      title: 'Setting up a GitHub Action',
      url: 'https://velog.io/@gold6219/PintOS-Project-3-VM-WIL',
      author: 'user1',
      platform: Platform.GITBLOG,
      date: new Date('2024-11-20T12:45:00Z'),
      score: 5.0,
      thumbnail_url:
        'https://velog.velcdn.com/images/gold6219/post/c01489dc-6f5d-4f69-b8d7-cbbb7e60bfef/image.png',
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  // **4. Keyword 데이터 추가**
  const keywords = ['Prisma', 'Docker', 'CI/CD'];

  for (const keyword of keywords) {
    const existingKeyword = await prisma.keyword.findFirst({
      where: { keyword },
    });

    if (!existingKeyword) {
      await prisma.keyword.create({ data: { keyword } });
      console.log(`Keyword "${keyword}" added.`);
    } else {
      console.log(`Keyword "${keyword}" already exists.`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
