'use strict';
const {Sequelize} = require('sequelize');



module.exports = (sequelize) => {
  class Train extends Sequelize.Model {}
	Train.init({
    id: {
      type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
		stationName: {
			type: Sequelize.STRING,
		},
		trainLine: {
			type: Sequelize.STRING,
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
    }, {sequelize});
    
    return Train;
}