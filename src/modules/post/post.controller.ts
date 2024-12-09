import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('headline')
  @ApiOperation({ summary: '헤드라인' })
  async getPost(
    @Query('page') page: number,
    @Query('bookmark') bookmark?: string,
    @Query('keyword') keyword?: string,
  ) {
    const result = await this.postService.getList(keyword, bookmark, page);
    return result;
  }

  @Get('keyword-list')
  @ApiOperation({ summary: '키워드 게시글 불러오기' })
  async getKeywordList(
    @Query('page') page: number,
    @Query('keyword') keyword?: string,
  ) {
    if (!page || page < -1) {
      throw new BadRequestException('유효한 페이지 번호를 입력하세요.');
    }

    const result = await this.postService.getKeywordList(keyword, page);
    return result;
  }

  @Get('bookmark-list')
  @ApiOperation({ summary: '북마크 게시글 불러오기' })
  async getBookmarkList(
    @Query('page') page: number,
    @Query('bookmark') bookmark?: string,
  ) {
    if (!page || page < -1) {
      throw new BadRequestException('유효한 페이지 번호를 입력하세요.');
    }
    const result = await this.postService.getKeywordList(bookmark, page);
    return result;
  }
}
