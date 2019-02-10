
import axios from 'axios'
import config from '../config/config.json'
import { GET_TASK_LIST, GET_ONE_TASK, DELETE_ONE_TASK, GET_TASK_GROUP_LIST, SEND_SOCKET_MESSAGE } from './index'

export function addTask(title, content, idgroupe, assignedto, priority, tasktag, dueon) {
  let date = new Date()
  if (dueon) {
    const parts = dueon.split('-');
    date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]))
  }
  date.setUTCHours(23, 59, 59)
  return function (dispatch) {
    axios.post(config.URL_SERV_BEGGIN + config.URL_API_REST + 'task/add', {
      params: {
        "title": title,
        "content": content,
        "idgroupe": idgroupe,
        "assignedto": assignedto,
        'tasktag': tasktag,
        'priority': priority,
        'dateend': date
      }
    })
      .then((response) => {
        dispatch({
          type: SEND_SOCKET_MESSAGE,
          payload: {
            message: 'cardAdd',
            data: ''
          }
        })
      })
      .catch((error) => this.gererErreur(error))
  }
}

/**
* Recupère et affecte dans le state l'ensemble des taches depuis le serveur
*/
export function getTaskList() {
  return function (dispatch) {
    axios.get(config.URL_SERV_BEGGIN + config.URL_API_REST + 'task')
      .then((response) => {
        dispatch({
          type: GET_TASK_LIST,
          payload: {
            taskList: response.data.response
          }
        })
      }).catch(function (error) {
        console.error(error)
      })
  }
}

/**
  * Recupère et ajoute dans le state une tache depuis le serveur
  * @param id : id de la tache à recuperer
  */
export function getOneTaskList(id) {
  return function (dispatch) {
    axios.get(config.URL_SERV_BEGGIN + config.URL_API_REST + 'task/' + id)
      .then((response) => {
        dispatch({
          type: GET_ONE_TASK,
          payload: {
            id: id,
            task: response.data.response[0]
          }
        })
      }).catch(function (error) {
        console.error(error)
      })
  }
}

export function updateTask(task) {
  return function (dispatch) {
    axios.put(config.URL_SERV_BEGGIN + config.URL_API_REST + 'task/update/' + task.id, {
      params: {
        'task': task
      }
    })
      .then((response) => {
        dispatch({
          type: SEND_SOCKET_MESSAGE,
          payload: {
            message: 'cardModif',
            data: task.id
          }
        })
      })
      .catch((error) => this.gererErreur(error))
  }
}

/**
* Supprime une tache du serveur puis du state
* @param idDelete : id de la tache a supprimer
*/
export function deleteTask(id) {
  return function (dispatch) {
    axios.delete(config.URL_SERV_BEGGIN + config.URL_API_REST + 'task/delete/' + id)
      .then((response) => {
        dispatch({
          type: SEND_SOCKET_MESSAGE,
          payload: {
            message: 'cardDelete',
            data: id
          }
        })
      })
      .catch((error) => this.gererErreur(error))
  }
}

export function deleteOneTask(id) {
  return function (dispatch) {
    axios.get(config.URL_SERV_BEGGIN + config.URL_API_REST + 'task/' + id)
      .then((response) => {
        dispatch({
          type: DELETE_ONE_TASK,
          payload: {
            id: id,
            task: response.data.response[0]
          }
        })
      }).catch(function (error) {
        console.error(error)
      })
  }
}

export function moveTask(id, newPos) {
  return function (dispatch) {
    axios.put(config.URL_SERV_BEGGIN + config.URL_API_REST + 'task/update/' + id, {
      params: {
        "idgroupe": newPos
      }
    })
      .then((response) => {
        dispatch({
          type: SEND_SOCKET_MESSAGE,
          payload: {
            message: 'cardMoved',
            data: id
          }
        })
      }).catch(function (error) {
        console.error(error)
      })
  }
}

export function getAllTaskGroup() {
  return function (dispatch) {
    axios.get(config.URL_SERV_BEGGIN + config.URL_API_REST + 'taskgroup')
      .then((response) => {
        dispatch({
          type: GET_TASK_GROUP_LIST,
          payload: {
            taskGroupList: response.data.response
          }
        })
      }).catch(function (error) {
        console.error(error)
      })
  }
}

export function updateTaskGroup(id, titre) {
  return function (dispatch) {
    axios.put(config.URL_SERV_BEGGIN + config.URL_API_REST + 'taskgroup/update/' + id, {
      params: {
        "tgr_titre": titre
      }
    })
      .then((response) => {
        dispatch({
          type: SEND_SOCKET_MESSAGE,
          payload: {
            message: 'laneModif',
            data: id
          }
        })
      }).catch(function (error) {
        console.error(error)
      })
  }
}

export function changePosTaskGroup(oldPosition, newPosition, id) {
  return function (dispatch) {
    axios.put(config.URL_SERV_BEGGIN + config.URL_API_REST + 'taskgroup/updatepos/' + id, {
      params: {
        "newPosition": newPosition,
        'oldPosition': oldPosition
      }
    })
      .then((response) => {
        dispatch({
          type: SEND_SOCKET_MESSAGE,
          payload: {
            message: 'laneMoved',
            data: id
          }
        })
      }).catch(function (error) {
        console.error(error)
      })
  }
}