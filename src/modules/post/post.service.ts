import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(keyword: string, bookmark: string, page: number) {
    try {
      if (keyword === 'new') {
        // 키워드에 관계없이 최신 게시글 조회
        const posts = await this.prisma.post.findMany({
          skip: page * 10,
          take: 10,
          orderBy: {
            date: 'desc',
          },
        });
        return posts;
      } else {
        // 키워드 별 조회
        const posts = await this.prisma.post.findMany({
          where: {
            keywords: {
              some: {
                keyword: keyword,
              },
            },
          },
          skip: page * 10,
          take: 10,
          include: {
            keywords: true,
          },
          orderBy: {
            date: 'desc',
          },
        });
        return posts;
      }
    } catch (error) {
      console.error('DB 조회 오류:', error);
      throw new InternalServerErrorException(
        '데이터베이스 조회에 실패했습니다.',
      );
    }
  }

  async getKeywordList(keyword: string, page: number) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          keywords: {
            some: {
              keyword: keyword,
            },
          },
        },
        skip: page * 10,
        take: 10,
        include: {
          keywords: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
      return posts;
    } catch (error) {
      console.error('DB 조회 오류:', error);
      throw new InternalServerErrorException(
        '데이터베이스 조회에 실패했습니다.',
      );
    }
  }

  async getBookmarkList(bookmark: string, page: number) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          bookmarks: {
            some: {
              bookmark_folder_name: bookmark,
            },
          },
        },
        skip: page * 10,
        take: 10,
        include: {
          bookmarks: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
      return posts;
    } catch (error) {
      console.error('DB 조회 오류:', error);
      throw new InternalServerErrorException(
        '데이터베이스 조회에 실패했습니다.',
      );
    }
  }
}
