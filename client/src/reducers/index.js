import { combineReducers } from 'redux';

//Authentification
import isAuth from './reducer_isauth'
import saveUser from './reducer_save_user'
import lastReport from './reducer_lastreport'
import getRole from './reducer_getrole'
import receiveBug from './reducer_receive_bug'
import getTaskList from './reducer_task'
import getTaskGroupList from './reducer_task_group'
import getTagColors from './reducer_tag'



const rootReducer = combineReducers({
    isAuthReducer: isAuth,
    saveUserReducer: saveUser,
    lastReportReducer: lastReport,
    getRoleReducer: getRole,
    receiveBugReducer: receiveBug,
    taskList: getTaskList,
    taskGroupList: getTaskGroupList,
    getTagColors: getTagColors
})

export default rootReducer;