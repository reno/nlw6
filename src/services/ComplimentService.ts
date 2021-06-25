import { classToPlain } from 'class-transformer';
import { getCustomRepository, Repository } from 'typeorm';

import { Compliment } from '../entities/Compliment';
import { ComplimentRepository } from '../repositories/ComplimentRepository';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';


interface ICreateRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class ComplimentService {

  async create({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: ICreateRequest) {
    if (user_sender === user_receiver) {
      throw new Error('Incorrect User Receiver');
    }
    const userRepository = getCustomRepository(UserRepository);
    const userReceiverExists = await userRepository.findOne(user_receiver);
    if (!userReceiverExists) {
      throw new Error('User Receiver does not exists!');
    }
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const compliment = complimentRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });
    await complimentRepository.save(compliment);
    return classToPlain(compliment);
  }

  async detail(id: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const compliment = await complimentRepository.findOne({id});
    return classToPlain(compliment);
  }

  async list_received(user_id: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const compliments = await complimentRepository.find({
      where: {
        user_receiver: user_id,
      },
    });
    return classToPlain(compliments);
  }

  async list_sent(user_id: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const compliments = await complimentRepository.find({
      where: {
        user_sender: user_id,
      },
    });
    return classToPlain(compliments);
  }
}

export { ComplimentService };
