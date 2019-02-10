export const IS_AUTH = 'IS_AUTH'

export function isAuthActions(isLogged){
    return {
        type: IS_AUTH,
        payload: isLogged
    }
}


export const SAVE_USER = 'SAVE_USER'

export function saveUserActions(tableParams){
    return {
        type: SAVE_USER,
        payload: tableParams
    }
}

export const GET_ROLE = 'GET_ROLE'

export function getRoleActions(Params){
    return {
        type: GET_ROLE,
        payload: Params
    }
}


export const LAST_REPORT = 'LAST_REPORT'

export function getLastReportActions(Params){
    return {
        type: LAST_REPORT,
        payload: Params
    }
}

export const RECEIVE_BUG = 'RECEIVE_BUG'

export function receiveBugActions(Params){
    return {
        type: RECEIVE_BUG,
        payload: Params
    }
}

export const GET_TAG_COLOR = 'GET_TAG_COLOR'

export function addTagColor(tag) {
  return function (dispatch) {
    dispatch({
      type: GET_TAG_COLOR,
      payload: tag
    })
  }
}

export const GET_TASK_LIST = 'GET_TASK_LIST'
export const GET_ONE_TASK = 'GET_ONE_TASK'
export const DELETE_ONE_TASK = 'DELETE_ONE_TASK'
export const GET_TASK_GROUP_LIST = 'GET_TASK_GROUP_LIST'
export const SEND_SOCKET_MESSAGE = 'SEND_SOCKET_MESSAGE'