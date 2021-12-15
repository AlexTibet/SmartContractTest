import {
  Column, DataType, Model, Scopes, Table
} from 'sequelize-typescript';

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }
}))

@Table
export class Example extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  id: string;

  @Column({ primaryKey: false, type: DataType.STRING })
  example: string;
}
