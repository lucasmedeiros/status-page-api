import { Model, DataTypes } from 'sequelize'
import connection from '@database/connection'

import Occurrence from './occurrence'

class OccurrenceStep extends Model<OccurrenceStepAttrs> {
  public id!: number
  public description!: string
  public occurrenceId: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OccurrenceStep.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'OccurrenceSteps',
  }
)

OccurrenceStep.belongsTo(Occurrence, {
  foreignKey: 'occurrenceId',
})

export default OccurrenceStep
