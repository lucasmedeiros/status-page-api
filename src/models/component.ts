import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
  defaultScope: {
    attributes: { exclude: ['deleted_at'] },
    paranoid: true,
  },
})
class Component extends Model<ComponentAttrs> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  public id!: number

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  public name: string
}

export default Component
