const TaskGroupModel = require('../models/taskgroup_model')
const tableMembers = 'amil_taskgroup'
const MainController = require('./main_controller')


exports.findAllTaskGroupController = (req, res) => {
  TaskGroupModel.findAllTaskGroupModel(tableMembers)
    .then((response) => MainController.validFunction(true, res, response, ''))
    .catch((error) => MainController.validFunction(false, res, '', error))
}

exports.findOneTaskGroupController = (req, res) => {
  TaskGroupModel.findOneTaskGroupModel(tableMembers, req.params.id, 'name')
    .then((response) => MainController.validFunction(true, res, response, ''))
    .catch((error) => MainController.validFunction(false, res, '', error))
}

exports.addTaskGroupController = (req, res) => {
  TaskGroupModel.addTaskGroupModel(tableMembers, req.body.params)
    .then((response) => MainController.validFunction(true, res, response, ''))
    .catch((error) => MainController.validFunction(false, res, '', error))
}

exports.updateTaskGroupController = (req, res) => {
  TaskGroupModel.updateTaskGroupModel(tableMembers, req.body.params, req.params.id)
    .then((response) => MainController.validFunction(true, res, response, ''))
    .catch((error) => MainController.validFunction(false, res, '', error))
}

exports.updatePositionTaskGroupController = (req, res) => {
  TaskGroupModel.updatePositionTaskGroupModel(tableMembers, req.body.params, req.params.id)
    .then((response) => MainController.validFunction(true, res, response, ''))
    .catch((error) => MainController.validFunction(false, res, '', error))
}


exports.deleteTaskGroupController = (req, res) => {
  TaskGroupModel.deleteTaskGroupModel(tableMembers, req.params.id)
    .then((response) => MainController.validFunction(true, res, response, ''))
    .catch((error) => MainController.validFunction(false, res, '', error))
}

exports.countTaskGroupController = (req, res) => {
  TaskGroupModel.countTaskGroupModel(tableMembers)
    .then((response) => MainController.validFunction(true, res, response, ''))
    .catch((error) => MainController.validFunction(false, res, '', error))
}