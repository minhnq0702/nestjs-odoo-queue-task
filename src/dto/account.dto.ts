import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class CreateAccountDto {
  @IsEmail(
    {
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      // require_tld: true,
    },
    { always: false },
  )
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    {
      message: (args) => {
        console.log(args);
        return 'Password is too weak';
      },
    },
  )
  password: string;

  account: string;

  @IsString()
  @IsOptional()
  role: string;
}
