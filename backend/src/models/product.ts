import mongoose, { Mongoose } from "mongoose";

interface IProductImage {
  fileName: string,
  originalName: string
}

interface IProduct {
  title: string,
  image: IProductImage,
  category: string,
  description?: string,
  price?: number
}

const imageSchema = new mongoose.Schema<IProductImage>({
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  }
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true
  },
  image: imageSchema,
  category: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    default: null
  }
});

export default mongoose.model<IProduct>('product', productSchema);