import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async singUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user: Promise<User> = this.userRepository.findOne({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, (await user).password))) {
      return 'login Success';
    } else {
      throw new UnauthorizedException('login Failed!');
    }
  }
}
