import { Request, Response } from 'express';
import { ComplimentService } from '../services/ComplimentService';

class ComplimentController {

  async create(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const { user_id } = request;
    const complimentService = new ComplimentService;
    const compliment = await complimentService.create({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });
    return response.json(compliment);
  }

  async detail(request: Request, response: Response) {
    const id = request.params.id;
    const complimentService = new ComplimentService;
    const compliment = await complimentService.detail(id);
    return response.json(compliment);
  }

  async list_received(request: Request, response: Response) {
    const { user_id } = request;
    const complimentService = new ComplimentService;
    const compliments = await complimentService.list_received(user_id);
    return response.json(compliments);
  }

  async list_sent(request: Request, response: Response) {
    const { user_id } = request;
    const complimentService = new ComplimentService;
    const compliments = await complimentService.list_sent(user_id);
    return response.json(compliments);
  }
}

export { ComplimentController };
