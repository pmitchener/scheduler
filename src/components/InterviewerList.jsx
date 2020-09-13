import React from 'react';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

import './InterviewerList.scss';

const InterviewerList = props => {
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  const interviewerList = props.interviewers.map(interviewer => {
    return <InterviewerListItem
      key={interviewer.id}
      {...interviewer}
      selected={interviewer.id === props.value}
      onChange={event => props.onChange(interviewer.id)}  />;
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
};

export default InterviewerList;