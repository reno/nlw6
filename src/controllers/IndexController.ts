import { Request, Response } from 'express';

class IndexController {

  handle(request: Request, response: Response) {
    const base_url = process.env.BASE_URL;
    return response.json({
      login: `${base_url}/login`,
      received_compliments: `${base_url}/compliments/received`,
      sent_compliments: `${base_url}/compliments/sent`,
      tags: `${base_url}/tags`,
      users: `${base_url}/users`,
    });
  }
}

export { IndexController };
