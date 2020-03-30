import { Model, DataTypes } from 'sequelize'
import connection from '@database/connection'

class Component extends Model<ComponentAttrs> {
  public id!: number
  public name!: string
  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Component.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
