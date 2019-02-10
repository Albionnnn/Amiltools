
import React, { Component, Fragment } from 'react';
import '../styles/Task.css'
/**
 * classe appeler lors de l'ajout d'une nouvelle carte
 */
class NewCard extends Component {
  state = {
    showDetail: false
  }

  updateField = (field, evt) => {
    this.setState({ [field]: evt.target.value })
  }

  handleAdd = () => {
    if (this.state.title)
      this.props.onAdd(this.state)
  }

  showDetail = (value) => {
    this.setState({ showDetail: value })
  }

  renderDetail() {
    const aujourdhui = new Date();
    const duJour = `${aujourdhui.getFullYear()}-${`${new Date().getMonth() + 1}`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(2, 0)}`
    if (!this.state.showDetail) {
      return (
        <div className='div-margin-top'>
          <button title='Ajouter détail' className="btn btn-outline-success my-2 my-sm-0 btndetail" onClick={() => this.showDetail(true)} >
            +
          </button >
        </div>
      )
    }
    else {
      return (
        <Fragment>
          <div className='div-small-margin-bottom'>
            <input className='input-trello' type="text" onChange={evt => this.updateField('tagList', evt)} placeholder="Tags" />
          </div>
          < div className='div-small-margin-bottom'>
            <select className='input-trello' defaultValue='medium'
              onChange={evt => this.updateField('priority', evt)}>
              <option key='high' value='high'>high</option>
              <option key='medium' value='medium'>medium</option>
              <option key='low' value='low'>low</option>
            </select>
          </div >
          <div className='div-small-margin-bottom'>
            <input className='input-trello' type="date" defaultValue={duJour} onChange={evt => this.updateField('dueon', evt)} placeholder="DueOn" />
          </div>
          <div className='div-margin-top'>
            <button title='Hide detail' className="btn btn-outline-warning my-2 my-sm-0 btndetail" onClick={() => this.showDetail(false)} >
              -
            </button >
          </div>
        </Fragment>)
    }
  }

  render() {
    const { onCancel } = this.props
    return (
      <div style={{ background: 'white', borderRadius: 5, border: '1px solid #eee', borderBottom: '1px solid #ccc' }}>
        <div style={{ padding: 5, margin: 5 }}>
          <div>
            <div style={{ marginBottom: 5 }}>
              <input className='input-trello' type="text" autoFocus onChange={evt => this.updateField('title', evt)} placeholder="Title" />
            </div>
            <div style={{ marginBottom: 5 }}>
              <input className='input-trello' type="text" onChange={evt => this.updateField('description', evt)} placeholder="Description" />
            </div>
            {this.renderDetail()}
          </div>
          <button className="btn btn-outline-success my-2 my-sm-0 btn-bottom-pop" onClick={this.handleAdd}>Add</button>
          <button className="btn btn-outline-danger my-2 my-sm-0 btn-bottom-pop" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
  }
}


export default NewCard