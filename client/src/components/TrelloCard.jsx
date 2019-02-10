import React from 'react';
import TagList from '../containers/TagList'
const CustomCard = props => {
  return (
    <div className='card-trello'>
      <header className='header-trello header-card-trello' style={{ color: props.cardColor }}>
        <div className='header-card-tittle-trello'>
          {props.title}
        </div>
        {props.dueOn ? <div className='card-trello-dueon'>{props.dueOn}</div> :
          <div>{props.create_at}</div>}
      </header>
      <div>
        <div className='description-card-trello'>
          {props.description ? props.description.split('\n').map(e => <div key={e}>{e}</div>) : <div></div>}
        </div>
        {props.tags && (
          <div className='tag-card-trello'>
            <TagList tagList={props.tags} editable={false} small={true} />
          </div>
        )}
      </div>
    </div >
  )
}
export default CustomCard;