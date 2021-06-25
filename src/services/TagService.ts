import { classToPlain } from 'class-transformer';
import { getCustomRepository, Repository } from 'typeorm';

import { Tag } from '../entities/Tag';
import { TagRepository } from '../repositories/TagRepository';


class TagService {
 
  async create(name: string) {
    if (!name) {
      throw new Error('Incorrect name!');
    }
    const tagRepository = getCustomRepository(TagRepository);
    const tagAlreadyExists = await tagRepository.findOne({name});
    if (tagAlreadyExists) {
      throw new Error('Tag already exists!');
    }
    const tag = tagRepository.create({
      name,
    });
    await tagRepository.save(tag);
    return classToPlain(tag);
  }

  async detail(id: string) {
    const tagRepository = getCustomRepository(TagRepository);
    const tag = await tagRepository.findOne({id});
    return classToPlain(tag);
  }

  async list() {
    const tagRepository = getCustomRepository(TagRepository);
    const tags = await tagRepository.find();
    return classToPlain(tags);
  }
}

export { TagService };