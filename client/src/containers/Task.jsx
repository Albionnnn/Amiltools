import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import config from '../config/config.json'
import { Board } from 'react-trello'
import NewCard from '../components/NewCard'
import socketIOClient from "socket.io-client";
import PopUpTrelloTask from './Popup/PopUpTrelloTask'
import CustomCard from '../components/TrelloCard'
import CustomLaneHeader from '../components/TrelloLane'
import { connect } from "react-redux";
import VerifUserRole from '../services/verif_role_user'
import {
  getTaskList, getOneTaskList, addTask, updateTask, deleteTask, deleteOneTask,
  moveTask, getAllTaskGroup, updateTaskGroup, changePosTaskGroup
} from '../actions/trello-action'
//Probleme Import CSS
import '../styles/Task.css'

class TaskManager extends Component {
  state = {
    color: { 'critical': '#A60000', 'high': 'red', 'medium': 'orange', 'low': 'green' },
    openPopup: false,
    taskOpened: {},
    canEditLane: false,
  }

  componentDidMount() {
    const VerifUserRol = new VerifUserRole()
    this.setState({ canEditLane: VerifUserRol.get50Value() })
    this.reload();
    //gestion des events socket
    const socket = socketIOClient(config.URL_SERV_BEGGIN);
    socket.on("lanesChange", data => this.props.getAllTaskGroup());
    socket.on("cardsChange", data => this.props.getTaskList());
    socket.on("cardDelete", id => this.props.deleteOneTask(id));
    socket.on("cardChange", id => this.props.getOneTaskList(id));
  }

  reload = () => {
    this.props.getTaskList();
    this.props.getAllTaskGroup()
  }

  // #region affichage
  /**
  * Render des lanes de trello a partir du state
  */
  getLane() {
    return Object.keys(this.props.allGroupList).map((id, key) => {
      return {
        id: this.props.allGroupList[id].tgr_id + '',
        title: this.props.allGroupList[id].tgr_titre,
        label: '',
        cards: this.getCards(this.props.allGroupList[id].tgr_id),
      }
    })
  }
  /**
    * Render des cards de trello, appartenant à une lane, a partir du state
   * @param idGrp : id de la lane parente
   */
  getCards = (idGrp) => {
    return Object.keys(this.props.allTaskList).filter((id) => {
      return this.props.allTaskList[id].idgroupe === idGrp
    }).map((id) => {
      return {
        id: this.props.allTaskList[id].id + '',
        title: this.props.allTaskList[id].title,
        description: this.props.allTaskList[id].content,
        create_at: this.convertDate(this.props.allTaskList[id].create_at),
        dueOn: this.convertDate(this.props.allTaskList[id].end_date),
        tags: this.getTagList(this.props.allTaskList[id]),
      }
    })
  }

  /**
   * Render des tags d'une card avec en premier la priorité
   * @param task : tache complete
   */
  getTagList = (task) => {
    if (!task) {
      return [];
    }
    return (task.priority + ',' + task.tasktag);
  }

  /**
   * convertie une date pour affiché un décompte (dans|il y a X jours|heures|minutes)
   * @param date la date a convertir 
   */
  convertDate(date) {
    if (!date) {
      return '';
    }
    const now = Date.now()
    const dateTask = new Date(date)
    let temps = now - dateTask;
    let debutLBL = 'il y a '
    if (dateTask > now) {
      temps = dateTask - now;
      debutLBL = 'dans '
    }

    if (Math.floor((temps) / (1000 * 60 * 60 * 24)) > 7) {
      return date.substring(0, 10).split('-').reverse().join('/')
    }
    else if (Math.floor((temps) / (1000 * 60 * 60)) >= 24) {
      return `${debutLBL}${Math.floor((temps) / (1000 * 60 * 60 * 24))} jour${Math.floor((temps) / (1000 * 60 * 60 * 24)) > 1 ? 's' : ''}`
    }
    else if (Math.floor((temps) / (1000 * 60)) >= 60) {
      return `${debutLBL}${Math.floor((temps) / (1000 * 60 * 60))} heure${Math.floor((temps) / (1000 * 60 * 60)) > 1 ? 's' : ''}`
    }
    else if (Math.floor((temps) / (1000)) >= 60) {
      return `${debutLBL}${Math.floor((temps) / (1000 * 60))} minute${Math.floor((temps) / (1000 * 60)) > 1 ? 's' : ''}`
    }
    else {
      return `${debutLBL}quelques secondes`
    }
  }

  // #endregion

  // #region Handle
  handleCardAdd = (card, laneId) => {
    this.props.addTask(card.title,
      (card.description ? card.description : ''),
      laneId,
      1,
      (card.priority ? card.priority : 'medium'),
      (card.tagList ? card.tagList : ''),
      card.dueon)
  }

  hidePopup = () => {
    this.setState({ openPopup: false })
  }

  onTaskModif = () => {
    this.hidePopup()
    this.props.updateTask(this.state.taskOpened)
  }

  onTaskDelete = () => {
    this.hidePopup()
    this.props.deleteTask(this.state.taskOpened.id)
    this.setState({ taskOpened: null })
  }

  onCardDelete = (cardId, laneId) => {
    this.props.deleteTask(cardId)
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    if (sourceLaneId !== targetLaneId) {
      this.props.moveTask(cardDetails.id, targetLaneId)
    }
  }

  handleLaneDragEnd = (oldPosition, newPosition, payload) => {
    this.props.changePosTaskGroup(oldPosition, newPosition, payload.id)
  }

  handleCardClick(cardId, metadata, laneId) {
    const task = this.props.allTaskList.find((item) => {
      return item.id + '' === cardId + ''
    })
    this.setState({ openPopup: true, taskOpened: task })
  }
  // #endregion

  render() {
    const data = {
      lanes: this.getLane()
    }
    return <Fragment>
      <Board
        data={data}
        editable
        canAddLanes={this.state.canEditLane}
        onCardAdd={this.handleCardAdd}
        onCardDelete={this.onCardDelete}
        handleDragEnd={this.handleDragEnd}
        handleLaneDragEnd={this.handleLaneDragEnd}
        onCardClick={(cardId, metadata, laneId) => this.handleCardClick(cardId, metadata, laneId)}
        draggable
        laneDraggable={this.state.canEditLane}
        customCardLayout
        newCardTemplate={<NewCard />}
        collapsibleLanes
        className='trello-board'
        customLaneHeader={<CustomLaneHeader edit={this.state.canEditLane} valideTitle={(id, titre) => this.props.updateTaskGroup(id, titre)} />}>
        <CustomCard />

      </Board >
      {
        this.state.openPopup &&
        <PopUpTrelloTask
          taskOpened={this.state.taskOpened}
          onClose={() => this.hidePopup()}
          onDelete={() => this.onTaskDelete()}
          onValide={() => this.onTaskModif()} />
      }
    </Fragment >
  }
}

function mapStateToProps(state) {
  return {
    allTaskList: state.taskList.taskList,
    allGroupList: state.taskGroupList.taskGroupList
  }
}

const mapDispatchToProps = {
  getTaskList, getOneTaskList, addTask, updateTask, deleteTask, deleteOneTask, moveTask, getAllTaskGroup, updateTaskGroup, changePosTaskGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskManager))