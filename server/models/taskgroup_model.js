const Model = require('./main_model')
const mysqlConnect = require('../config/connexion');
const connect = new mysqlConnect()
const DB = connect.isConnected()
const config = require('../config/config')

module.exports = {

  findAllTaskGroupModel(table) {
    return new Promise((resolve, reject) => {
      Model.findAllMainModel(table, '*', 'tgr_position')
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  findOneTaskGroupModel(table, req, search) {
    return new Promise((resolve, reject) => {
      Model.findMainModel(table, req)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  addTaskGroupModel(table, req) {
    return new Promise((resolve, reject) => {
      Model.verifTable(table)
        .then((response) => {
          const long = Object.keys(req).length

          if (Model.verifParamsNumber(long, 5)) {
            const date = Date.now();
            const requeteString = `INSERT INTO ${table}(title, content, priority, assignedto,idgroupe) VALUES ("${req.title}", "${req.content}", "${req.priority}", "${req.assignedto}", "${req.idgroupe}")`;
            console.log('------------');
            console.log('Request addTaskGroupModel : ' + requeteString);
            console.log('------------');
            DB.query(requeteString, (err, result) => {
              if (err) reject(config.error.notaddTaskGroup)
              else resolve(config.success.TaskGroupadd)
            })
          } else reject(config.error.missingparams)
        })
        .catch((error) => reject(error))
    })
  },

  updateTaskGroupModel(table, paramsArray, search) {
    return new Promise((resolve, reject) => {
      Model.updateMainModel(table, paramsArray, search, 'tgr_id')
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  updatePositionTaskGroupModel(table, paramsArray, search) {
    return new Promise((resolve, reject) => {
      Model.verifTable(table)
        .then((response) => {
          const requeteString = `SELECT changePos(${search},${paramsArray.oldPosition},${paramsArray.newPosition}) as valide`;
          console.log('------------');
          console.log('Request addTaskGroupModel : ' + requeteString);
          console.log('------------');
          DB.query(requeteString, (err, result) => {
            if ((err) || (result[0].valide === 0)) reject(config.error.notChangePosTaskGroup)
            else resolve(result)
          })
        })
        .catch((error) => reject(error))
    })
  },

  deleteTaskGroupModel(table, id) {
    return new Promise((resolve, reject) => {
      Model.deleteModel(table, id)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  countTaskGroupModel(table) {
    return new Promise((resolve, reject) => {
      Model.countMainModel(table)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }
}