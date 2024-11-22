import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async createUser(@Body() body: CreateUserDto) {
    try {
      return await this.userService.create(body);
    } catch (error) {
      throw new HttpException(
        '회원가입에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async login(@Body() body: LoginUserDto) {
    try {
      return await this.userService.login(body);
    } catch (error) {
      throw new HttpException(
        '로그인에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
