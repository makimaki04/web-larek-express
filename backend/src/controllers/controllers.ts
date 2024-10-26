import { NextFunction, Request, Response } from 'express';
import Product from '../models/product'
import { simpleFaker } from '@faker-js/faker';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then(products => res.status(200).send({ items: products, total: products.length }))
    .catch(next);
};

export const addProduct = (req: Request, res: Response, next: NextFunction) => {
  const { title, image, category, description, price } = req.body;

  Product.create({ title, image, category, description, price })
    .then(product => res.send({ item: product }))
    .catch((error) => {
      if (error.message.includes('E11000')) {
        return next(new ConflictError('Товар с таким заголовком уже существует'));
      }
      if (error instanceof Error) {
        return next(new BadRequestError('Ошибка валидации данных при создании товара'));
      }
      next(error);
    });
};

export const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const { total, items, payment, email, phone, address } = req.body;

  if (!total || !payment || !email || !phone || !address) {
    return next(new BadRequestError('Ошибка валидации данных при создании товара'));
  }

  if (!Array.isArray(items) || !items.length) {
    return next(new BadRequestError('Ошибка валидации данных при создании товара'));
  }

  Product.find({ _id: { $in: items } })
    .then(products => {
      let sum = 0;
      products.forEach(product => {
        if (product.price) sum += product.price;
      });

      if (sum !== total) {
        throw new BadRequestError('Ошибка валидации данных при создании товара');
      }

      res.send({ id: simpleFaker.string.uuid(), total: sum });
    })
    .catch(next);
};