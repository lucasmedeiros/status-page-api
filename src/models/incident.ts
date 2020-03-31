import { Model, DataTypes } from 'sequelize'
import connection from '@database/connection'

class Incident extends Model<IncidentAttrs> {
  public id!: number
  public name!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Incident.init(
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
    tableName: 'Incidents',
  }
)

export default Incident
