import React, {useState} from 'react';

import './InterviewerListItem.scss';
const InterviewerListItem = props => {
//--selected
  const interViewerClass = props.selected ? "interviewers__item--selected" : "interviewers__item";
  return (
    <li className={interViewerClass} onClick={props.onChange}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
      {props.selected && props.name}
    </li>
  );
};
export default InterviewerListItem;