import { GET_TASK_LIST, GET_ONE_TASK, DELETE_ONE_TASK, SEND_SOCKET_MESSAGE } from '../actions/index';

import socketIOClient from "socket.io-client";
import config from '../config/config.json'

const initialState = {
  taskList: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASK_LIST:
      return {
        taskList: action.payload.taskList
      }
    case GET_ONE_TASK: {
      const tmpListe = state.taskList.filter((item) => {
        return (item.id + '') !== (action.payload.id + '')
      })
      tmpListe.push(action.payload.task)
      return {
        taskList: tmpListe
      }
    }
    case DELETE_ONE_TASK: {
      const tmpListe = state.taskList.filter((item) => {
        return (item.id + '') !== (action.payload.id + '')
      })
      return {
        taskList: tmpListe
      }
    }
    case SEND_SOCKET_MESSAGE:
      const socket = socketIOClient(config.URL_SERV_BEGGIN)
      socket.emit(action.payload.message, action.payload.data)
      return state
    default:
      return state
  }
}