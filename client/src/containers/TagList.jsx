import React, { Component, Fragment } from 'react';
import TrelloTag from '../components/TrelloTag';
import { connect } from 'react-redux'
import { addTagColor } from '../actions/index'
import '../styles/Task.css'
/**
 * affiche ue liste de tag stylisé avec une case de couleur différente pour chaque tag
 * @params taglist, string :  la liste de tag a affiché
 * @params separator, string (optionnel):  séparateur de la liste de tag, optionnel, (, par défaut)
 * @params editable, boolean (optionnel): pour savoir si on peut modifier et rajouter des tag (true par défaut)
 * @params small, boolean (optionnel): affichage plus petit (false par défaut)
 * @param onValideText(newTagList)
 */
class TagList extends Component {
  state = {
    idOpen: -1,
    separator: ','
  }

  constructor(props) {
    super(props);
    if (this.props.separator) {
      this.setState({ separator: this.props.separator })
    }
  }

  changeText = (pos, text, openNew) => {
    let forceOpen = -1
    if (openNew)
      forceOpen = pos + 1
    const tagTab = this.props.tagList.split(this.state.separator);
    let newTagList = ''
    for (var i = 0; i < tagTab.length; i++) {
      if (newTagList.length > 0)
        newTagList += this.state.separator
      if (pos + '' === i + '')
        newTagList += text
      else
        newTagList += tagTab[i]
    }
    this.props.onValideText(newTagList)
    this.setState({ idOpen: forceOpen })
  }

  getClearTagList = () => {
    //renvoie la liste de tag épuré
    //le 1er groupe enleve les , et espaces de début de chaine(^[\s,]+)
    //le 2eme groupe enleve les , et espaces de fin de chaine([\s,]+$)
    //le 3eme groupe enleve les espaces avant les virgules
    //la 4eme regexp enleve les ',' et espaces après une virgule (,)[\s,]+ 
    //remplace ça par la virgule gardé en mémoire si c'est le 4eme groupe qui à été matché
    const regex = new RegExp(`^[s${this.state.separator}]+|[s${this.state.separator}]+$|s+(?=${this.state.separator})|(${this.state.separator})[s${this.state.separator}]+`)
    return this.props.tagList.replace(regex, '$1')
  }

  getTagColorTest = (tag) => {
    tag = tag.toLowerCase();
    if (!this.props.TagColorsList[tag])
      this.props.addTagColor(tag)
    return this.props.TagColorsList[tag]
  }

  afficheTag = () => {
    const tagTab = this.props.tagList.split(this.state.separator);
    const tagAffiche = []
    for (var i = 0; i < tagTab.length; i++) {
      if ((tagTab[i].trim().length >= 1) || (i + '' === this.state.idOpen + '')) {
        tagAffiche.push(<TrelloTag
          key={Math.random() * 250}
          tag={tagTab[i]}
          id={i}
          modeEdit={i + '' === this.state.idOpen + ''}
          editable={this.props.editable}
          small={this.props.small}
          color={this.getTagColorTest(tagTab[i])}
          separator={this.state.separator}
          valideText={((pos, text, openNew) => this.changeText(pos, text, openNew))} />)
      }
    }
    return tagAffiche
  }

  handleAdd = (event) => {
    //uniquement si l'event est appelé via un clique et pas avec un entré
    if (event.detail > 0) {
      this.props.onValideText(this.props.tagList + ',')
      this.setState({ idOpen: this.props.tagList.split(this.state.separator).length })
    }
    event.preventDefault()
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const classNameCss = 'tag-popup-trello' + (this.props.small ? ' tag-small' : '')
    return (
      <Fragment>
        {this.afficheTag()}
        {((typeof this.props.editable === 'undefined') || (this.state.editable)) ?
          <button className={[classNameCss]} onClick={(e) => this.handleAdd(e)}>+</button>
          : ''}
      </Fragment >
    )
  }
}
function mapStateToProps(state) {
  return {
    TagColorsList: state.getTagColors.colors,
  }
}
const mapDispatchToProps = { addTagColor }

export default connect(mapStateToProps, mapDispatchToProps)(TagList);