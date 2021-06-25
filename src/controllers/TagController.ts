import { Request, Response } from 'express';
import { TagService } from '../services/TagService';


class TagController {
  
  async create(request: Request, response: Response) {
    const { name } = request.body;
    const tagService = new TagService;
    const tag = await tagService.create(name);
    return response.json(tag);
  }

  async detail(request: Request, response: Response) {
    const id = request.params.id;
    const tagService = new TagService;
    const tag = await tagService.detail(id);
    return response.json(tag);
  }

  async list(request: Request, response: Response) {
    const tagService = new TagService;
    const tags = await tagService.list();
    return response.json(tags);
  }
}

export { TagController };