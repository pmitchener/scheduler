import React, {useState} from 'react';
import InterviewerListItem from "./InterviewerListItem";

import './InterviewerList.scss';

const InterviewerList = props => {
  console.log("rendering InterviewerList interviewer ", props.value)
  const interviewerList = props.interviewers.map(interviewer => {
    return <InterviewerListItem 
      key={interviewer.id} 
      {...interviewer} 
      selected={interviewer.id === props.value} 
      onChange={event => props.onChange(interviewer.id)}  /> //setInterviewer={event => props.setInterviewer(interviewer.id)}
  });
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>    
  );
};

export default InterviewerList;