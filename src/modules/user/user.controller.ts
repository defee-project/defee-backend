import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일입니다.' })
  @ApiResponse({ status: 409, description: '이미 존재하는 닉네임입니다.' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async createUser(@Body() body: SignupDto) {
    try {
      await this.authService.signup(body);
      return {
        message: '회원가입 성공',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        '회원가입에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 404, description: '존재하지 않는 이메일입니다.' })
  @ApiResponse({ status: 400, description: '비밀번호가 일치하지 않습니다.' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async login(@Body() body: LoginDto) {
    try {
      const result = await this.authService.login(body);
      return {
        message: '로그인 성공',
        accessToken: result.accessToken,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        '로그인에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/checkemail')
  @ApiOperation({ summary: '이메일 중복 체크' })
  @ApiResponse({ status: 200, description: '사용 가능한 이메일입니다.' })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일입니다.' })
  async checkEmail(@Body() body: { email: string }) {
    const user = await this.userService.findOneByEmail(body.email);
    if (user) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    return { message: '사용 가능한 이메일입니다.' };
  }

  @Post('/checkusername')
  @ApiOperation({ summary: '이메일 중복 체크' })
  @ApiResponse({ status: 200, description: '사용 가능한 닉네임입니다.' })
  @ApiResponse({ status: 409, description: '이미 존재하는 닉네임입니다.' })
  async checkUsername(@Body() body: { username: string }) {
    const user = await this.userService.findOneByEmail(body.username);
    if (user) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }
    return { message: '사용 가능한 닉네임입니다.' };
  }
}
