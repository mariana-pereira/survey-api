import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const UsersRepository = getRepository(User);

    const userAlreadyExists = await UsersRepository.findOne({ email });

    if(userAlreadyExists) {
      response.status(400).send({ error: 'User already exists!' });
    }

    const user = UsersRepository.create({
      name,
      email
    });

    await UsersRepository.save(user);

    return response.json(user);
  }

}

export { UserController };