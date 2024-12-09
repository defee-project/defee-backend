import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePassword } from '../../common/utils/bcrypt.utils';
import { LoginDto } from './dtos/login.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 회원가입
  async signup(signupDto: SignupDto) {
    const { email, password, username, blog_url } = signupDto;

    // 이메일 중복 체크
    const userByEmail = await this.userService.findOneByEmail(email);
    if (userByEmail) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 닉네임 중복 체크
    const userByUsername = await this.userService.findOneByUsername(username);
    if (userByUsername) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await hashPassword(password);

    // 회원 생성
    const user = await this.userService.create(
      email,
      hashedPassword,
      username,
      blog_url,
    );

    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 이메일로 사용자 찾기
    const loginUser = await this.userService.findOneByEmail(email);
    if (!loginUser) {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }
    // 비밀번호 확인 (암호화된 비밀번호와 비교)
    const isPasswordValid = await comparePassword(password, loginUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    const payload = {
      userId: loginUser.user_id,
      email: loginUser.email,
      username: loginUser.username,
    };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}
