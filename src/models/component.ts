import { Model, DataTypes } from 'sequelize'
import connection from '@database/connection'

class Component extends Model<ComponentAttrs> {
  public id!: number
  public name!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Component.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'Components',
  }
)

export default Component
