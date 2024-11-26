import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 닉네임',
    example: 'Jaenam',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: '이메일',
    example: 'jaenam@defee.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'password123@',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '블로그 주소',
    example: 'https://jaenam615.github.io/',
  })
  blog_url?: string;
}
