import { GET_TASK_GROUP_LIST } from '../actions/index';

const initialState = {
  taskGroupList: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASK_GROUP_LIST:
      return {
        taskGroupList: action.payload.taskGroupList
      }
    default:
      return state
  }
}