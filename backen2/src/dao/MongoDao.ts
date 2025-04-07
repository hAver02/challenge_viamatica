import { Model } from "mongoose";

export default class MongoDao<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  create = async (body: T): Promise<T> => {
    return await this.model.create(body);
  }

  getAll = async (): Promise<T[]> => {
    return await this.model.find({});
  }

  getById = async (id: string): Promise<T | null> => {
    return await this.model.findById(id);
  }

  update = async (id: string, body: Partial<T>): Promise<T | null> => {
    return await this.model.findByIdAndUpdate(id, body, { new: true });
  }

  delete = async (id: string): Promise<T | null> => {
    return await this.model.findByIdAndDelete(id);
  }
}
