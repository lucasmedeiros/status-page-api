import { Model, DataTypes } from 'sequelize'
import connection from '@database/connection'

import Component from './component'
import Incident from './incident'

class Occurrence extends Model<OccurrenceAttrs> {
  public id!: number
  public active!: boolean
  public description!: string
  public componentId: number
  public incidentId: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Occurrence.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'Occurrences',
  }
)

Occurrence.belongsTo(Component, {
  foreignKey: 'componentId',
})

Occurrence.belongsTo(Incident, {
  foreignKey: 'incidentId',
})

export default Occurrence
