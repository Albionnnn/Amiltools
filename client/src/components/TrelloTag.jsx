import React, { Component, Fragment } from 'react';
import '../styles/Task.css'

class TrelloTag extends Component {
  state = {
    modeEdit: false,
    editable: true,
    title: '',
    x: 0,
    firstUpdate: true,
    separator: ','
  }

  componentDidMount() {
    this.setState({ title: this.props.tag })
    if ((this.props.modeEdit) && (!this.state.modeEdit)) {
      this.setState({ modeEdit: this.props.modeEdit })
    }
    if ((typeof this.props.editable !== 'undefined') && (this.state.editable)) {
      this.setState({ editable: this.props.editable })
    }
  }
  // recupère la position de la souris tant qu'on est pas en mode edit, pour positionné le curseur au clic
  _onMouseMove(e) {
    if (!this.state.modeEdit) {
      this.setState({ x: e.nativeEvent.offsetX });
    }
  }
  //Lors du clic au passage au mode edit, uniquement la 1ere fois, positionne le curseur à la position du clic ~
  componentDidUpdate() {
    if (this.state.modeEdit && this.state.firstUpdate) {
      this.refs.test.selectionStart = this.refs.test.selectionEnd = Math.round(this.state.x / 10)
      this.setState({ firstUpdate: false })
    }
  }

  onKeyPress = event => {
    if ((event.key !== 'Enter') && (event.key !== 'Escape') && (event.key !== this.state.separator))
      return;
    if ((event.key === 'Enter') || (event.key === this.state.separator))
      this.props.valideText(this.props.id, this.state.title.trim(), (event.key === this.state.separator))
    this.setState({ modeEdit: false })
    event.preventDefault()
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  supprimer = event => {
    event.preventDefault()
    event.stopPropagation();
    this.props.valideText(this.props.id, '', false)
  }

  render() {
    const buttonHandler = () => {
      this.setState({ modeEdit: this.state.editable, firstUpdate: true })
    }
    const classNameCss = 'tag-popup-trello' + (this.props.small ? ' tag-small' : '')
    return (
      <Fragment>
        {
          this.state.modeEdit ?
            <input
              autoFocus
              className={[classNameCss]}
              ref='test'
              style={{
                background: this.props.color
                , border: `0px solid ${this.props.color}`
              }}
              type="text"
              value={this.state.title}
              onBlur={(e) => { this.setState({ modeEdit: false }) }}
              onKeyUp={(e) => { this.onKeyPress(e) }}
              onChange={(e) => { this.setState({ title: e.target.value }) }} /> :
            <span
              onClick={buttonHandler}
              className={[classNameCss]}
              style={{ backgroundColor: this.props.color }}
              onMouseMove={(e) => { this._onMouseMove(e) }}>
              {this.props.tag}
              {this.state.editable ? <span className="btn-suppr-tag" onClick={this.supprimer}></span> : ''}
            </span>
        }
      </Fragment >
    )
  }
}


export default TrelloTag;