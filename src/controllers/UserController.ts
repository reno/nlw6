import { Request, Response } from 'express';
import { UserService } from '../services/UserService';


class UserController {

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;
    const userService = new UserService;
    const token = await userService.authenticate({
      email,
      password,
    });
    return response.json(token);
  }

  async create(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;
    const userService = new UserService;
    const user = await userService.create({ name, email, password, admin });
    return response.json(user);
  }

  async detail(request: Request, response: Response) {
    const id = request.params.id;
    const userService = new UserService;
    const user = await userService.detail(id);
    return response.json(user);
  }

  async list(request: Request, response: Response) {
    const userService = new UserService;
    const users = await userService.list();
    return response.json(users);
  }
}

export { UserController };
