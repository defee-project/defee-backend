import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, username, blog_url } = createUserDto;
    const userByEmail = await this.findOneByEmail(email);
    if (userByEmail) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    const userByUsername = await this.findOneByUsername(username);
    if (userByUsername) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    await this.prisma.user.create({
      data: {
        email,
        password,
        username,
        blog_url,
      },
    });
    return { message: '회원가입에 성공했습니다.' };
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async find() {
    return await this.prisma.user.findMany();
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const loginUser = await this.findOneByEmail(email);
    if (!loginUser) {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }
    if (loginUser.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return { message: '로그인에 성공했습니다.' };
  }
}
