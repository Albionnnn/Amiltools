const Model = require('./main_model')
const mysqlConnect = require('../config/connexion');
const connect = new mysqlConnect()
const DB = connect.isConnected()
const config = require('../config/config')

module.exports = {

  findAllTaskModel(table) {
    return new Promise((resolve, reject) => {
      Model.findAllMainModel(table)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  findOneTaskModel(table, req, search) {
    return new Promise((resolve, reject) => {
      Model.findMainModel(table, req)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  addTaskModel(table, req) {
    return new Promise((resolve, reject) => {
      Model.verifTable(table)
        .then((response) => {
          const long = Object.keys(req).length
          if (Model.verifParamsNumber(long, 7)) {
            const requeteString = `INSERT INTO ${table}(title, content, priority, tasktag, assignedto,idgroupe,end_date) 
            VALUES ("${req.title}", "${req.content}", "${req.priority}","${req.tasktag}", "${req.assignedto}", "${req.idgroupe}", "${req.dateend}")`;
            console.log('------------');
            console.log('Request addTaskModel : ' + requeteString);
            console.log('------------');
            DB.query(requeteString, (err, result) => {
              if (err) reject(config.error.notaddtask)
              else resolve(config.success.taskadd)
            })
          } else reject(config.error.missingparams)
        })
        .catch((error) => reject(error))
    })
  },

  updateTaskModel(table, paramsArray, search) {
    return new Promise((resolve, reject) => {
      Model.updateMainModel(table, paramsArray, search)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  deleteTaskModel(table, id) {
    return new Promise((resolve, reject) => {
      Model.deleteModel(table, id)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  countTaskModel(table) {
    return new Promise((resolve, reject) => {
      Model.countMainModel(table)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }
}