import { classToPlain } from 'class-transformer';
import { compare } from 'bcryptjs';
import { getCustomRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UserRepository } from '../repositories/UserRepository';


interface IAuthenticateRequest {
  email: string;
  password: string;
}

interface ICreateRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class UserService {
 
  async authenticate({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({email});
    if (!user) {
      throw new Error('Email/password incorrect');
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Email/password incorrect');
    }
    const token = sign(
      {email: user.email},
      process.env.SECRET_KEY,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );
    return token;
  }

  async create({ name, email, password, admin = false }: ICreateRequest) {
    if (!email) {
      throw new Error('Email incorrect');
    }
    const userRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await userRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }
    const passwordHash = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });
    await userRepository.save(user);
    return classToPlain(user);
  }

  async detail(id: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({id});
    return classToPlain(user);
  }

  async list() {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    return classToPlain(users);
  }
}

export { UserService };
