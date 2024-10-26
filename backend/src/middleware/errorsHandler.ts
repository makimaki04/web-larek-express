import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

const errorsHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) {
    return res.status(400).send({ message: err.message || 'Ошибка валидации данных при создании товара' });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: err.message || 'Маршрут не найден' });
  }

  if (err instanceof ConflictError) {
    return res.status(409).send({ message: err.message || 'Товар с таким заголовком уже существует' });
  }

  // Если ошибка не предусмотрена, возвращаем 500
  console.error('Необработанная ошибка:', err);
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};

export default errorsHandler;