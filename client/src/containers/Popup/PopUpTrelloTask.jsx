import React, { Component, Fragment } from 'react';
import DateTimePicker from 'react-datetime-picker'
import '../../styles/Popup.css'
import TagList from '../TagList';
/**
 * Pop-up pour la modification d'une tache
 * @param taskOpened task : la tache à affiché et modifié
 * @param onClose() function : methode appelé pour fermé sans rien faire
 * @param onDelete() function : methode appelé pour fermé et supprimé
 * @param onValide() function : methode appelé pour fermé et validé la modification
 */
class PopUpTrelloTask extends Component {

  state = {
    "contentTask": this.props.taskOpened.content,
    "titleTask": this.props.taskOpened.title,
    "tagTask": this.props.taskOpened.tasktag,
    "dueOn": this.props.taskOpened.end_date,
    "priority": this.props.taskOpened.priority,
    idOpen: -1
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false)
    switch (this.state.priority.toLowerCase()) {
      case 'low':
        this.editPriority('priority-success')
        break
      case 'medium':
        this.editPriority('priority-warning')
        break
      case 'high':
        this.editPriority('priority-danger')
        break
      default:
        this.editPriority('priority-warning')
        break
    }
  }

  editPriority = priority => {
    const priorityTable = ['success', 'warning', 'danger']
    const priority1 = priority.split('-')
    const newPriority = priority1[1]
    switch (newPriority.toLowerCase()) {
      case 'success':
        this.setState({ priority: 'low' })
        break
      case 'warning':
        this.setState({ priority: 'medium' })
        break
      case 'danger':
        this.setState({ priority: 'high' })
        break
      default:
        this.setState({ priority: 'medium' })
        break
    }
    for (let i = 0; i < priorityTable.length; i++) {
      if (newPriority === priorityTable[i]) {
        const priorityTask = newPriority.replace('warning', 'medium').replace('success', 'low').replace('danger', 'high')
        this.setState({ priorityTask })
        document.getElementById(`priority-${newPriority}-popup`).classList.replace(`btn-outline-${newPriority}`, `btn-${newPriority}`)
      } else {
        document.getElementById(`priority-${priorityTable[i]}-popup`).classList.replace(`btn-${priorityTable[i]}`, `btn-outline-${priorityTable[i]}`)
      }
    }
  }

  handleEditTask = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  onDateChange = date => this.setState({ dueOn: date })

  handleKeyDown = event => {
    if (event.key === 'Escape')
      this.props.onClose()
    if (event.altKey && event.key === 'v')
      this.onValide()
    if (event.altKey && event.key === 's')
      this.props.onDelete()
  }

  onValide = () => {
    this.props.taskOpened.content = this.state.contentTask
    this.props.taskOpened.title = this.state.titleTask
    //renvoie la liste de tag épuré
    //le 1er groupe enleve les , et espaces de début de chaine(^[\s,]+)
    //le 2eme groupe enleve les , et espaces de fin de chaine([\s,]+$)
    //le 3eme groupe enleve les espaces avant les virgules
    //la 4eme regexp enleve les ',' et espaces après une virgule (,)[\s,]+ 
    //remplace ça par la virgule gardé en mémoire si c'est le 4eme groupe qui à été matché
    this.props.taskOpened.tasktag = this.state.tagTask.replace(/^[\s,]+|[\s,]+$|\s+(?=,)|(,)[\s,]+/g, '$1');
    this.props.taskOpened.end_date = this.state.dueOn
    this.props.taskOpened.priority = this.state.priority
    this.props.onValide();
  }

  valideText = (tag) => {
    this.setState({ tagTask: tag })
  }

  render() {
    const dateDuD = new Date(this.state.dueOn)
    return (
      <Fragment>
        <div id="popupTask" >
          <div className="titleReportContent">
            {this.props.taskOpened.title}  <span onClick={this.props.onClose} className="closeItem"><i className="fas fa-times-circle"></i></span>
          </div>
          <div className="popupContent">
            <form>
              <div className="form-group row">
                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                  <input onChange={this.handleEditTask} type="text" className="form-control" id="titleTask" value={this.state.titleTask} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="priority" className="col-sm-2 col-form-label">Priority</label>
                <div role="group" className="btn-group col-sm-10">
                  <div onClick={() => this.editPriority('priority-danger')} id='priority-danger-popup' className="btn btn-danger my-2 my-sm-0">High</div>
                  <div onClick={() => this.editPriority('priority-warning')} id='priority-warning-popup' className="btn btn-outline-warning my-2 my-sm-0">Medium</div>
                  <div onClick={() => this.editPriority('priority-success')} id='priority-success-popup' className="btn btn-outline-success my-2 my-sm-0">Low</div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="content" className="col-sm-2 col-form-label">Content</label>
                <div className="col-sm-10 contentTask">
                  <textarea onChange={this.handleEditTask} className="form-control" id="contentTask" rows="6" value={this.state.contentTask}></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="content" className="col-sm-2 col-form-label">Tag</label>
                <div className="col-sm-10 contentTask" style={{ paddingTop: '2px' }}>
                  <TagList
                    tagList={this.state.tagTask}
                    onValideText={(tag) => this.valideText(tag)} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="content" className="col-sm-2 col-form-label">Date de fin : </label>
                <div className="col-sm-10 contentTask">
                  <DateTimePicker onChange={this.onDateChange} id="dueOn" value={dateDuD} />
                </div>
              </div>
            </form>
            <hr />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.onValide}><u>V</u>alider</button>
            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.props.onDelete}><u>S</u>upprimer</button>
          </div>
        </div>
      </Fragment >
    )
  }
}

export default PopUpTrelloTask;
