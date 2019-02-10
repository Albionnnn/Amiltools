import React, { Component } from 'react';
import '../styles/Task.css'

class CustomLaneHeader extends Component {
  state = {
    editTitle: false,
    title: ''
  }
  onKeyPress = event => {
    if ((event.key !== 'Enter') && (event.key !== 'Escape'))
      return;
    if ((this.state.title.trim() !== '') && (event.key === 'Enter'))
      this.props.valideTitle(this.props.id, this.state.title.trim())
    this.setState({ editTitle: false })
  }
  render() {
    const buttonHandler = () => {
      this.setState({ editTitle: this.props.edit, title: this.props.title })
    }
    return (
      <div>
        <header className='header-lane-trello header-trello'>
          {this.state.editTitle ?
            <input
              autoFocus
              className='input-trello'
              type="text"
              value={this.state.title}
              onBlur={(e) => { this.setState({ editTitle: false }) }}
              onKeyDown={(e) => { this.onKeyPress(e) }}
              onChange={(e) => { this.setState({ title: e.target.value }) }} /> :
            <div onClick={buttonHandler} className='titre-lane-trello'>{this.props.title}</div>}
        </header>
      </div >
    )
  }
}


export default CustomLaneHeader;