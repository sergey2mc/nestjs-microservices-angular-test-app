import { Model } from 'mongoose';

import { PickProperty } from '../../../../types/types';

export class BaseService<T> {
  constructor(
    protected model: Model<T>,
  ) {}

  find: PickProperty<Model<T>, 'find'> = this.model.find.bind(this.model);
  findOne: PickProperty<Model<T>, 'findOne'> = this.model.findOne.bind(this.model);
  findOneAndUpdate: PickProperty<Model<T>, 'findOneAndUpdate'> = this.model.findOneAndUpdate.bind(this.model);
  create: PickProperty<Model<T>, 'create'> = this.model.create.bind(this.model);
}
