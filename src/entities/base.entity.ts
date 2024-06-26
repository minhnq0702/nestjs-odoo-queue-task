import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseEntity {
  @Prop({ select: false })
  __v?: number;

  // @Prop({ _id: true, select: false })
  // id?: number;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}

export type BaseFilter<T> = {
  id?: string | Record<'$in', any>;
} & T;

export type BaseSort = Record<string, number>;

export type BaseOperate<T, U> = {
  filterFields: BaseFilter<T>;
  // updateFields?: U & Record<string, any>; // ? should change to Partial<T>
  updateFields?: U;
  sortFields?: Record<string, number>;
  limit?: number | null;
};

export const GetDomain = <T>(options: BaseFilter<T>) => {
  const domain = {};
  Object.keys(options).forEach((key) => {
    if (key === 'id') domain['_id'] = options[key];
    else domain[key] = options[key];
  });
  return domain;
};
