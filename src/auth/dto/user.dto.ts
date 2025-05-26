import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: "User's first name" })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "User's last name" })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: "User's email address" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User's password", minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: "User's mobile number" })
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ description: "User's refresh token", required: false })
  @IsOptional() 
  refreshToken?: string;
}

export class ForgotPasswordSendOtpDTO {
  @ApiProperty({
    description: 'email',
    type: String,
    example: 'email'
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string

}

export class ForgotPasswordVerifyOtpDTO {
  @ApiProperty({
    description: 'email',
    type: String,
    example: 'email'
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({
    description: 'otp',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  readonly otp: string

  reference_id: string
}

export class VerifyTokenAndChangePasswordDTO {
  @ApiProperty({
    description: 'password',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string

  @ApiProperty({
    description: 'token',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string
}
