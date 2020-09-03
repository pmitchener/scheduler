/*
It is standard behaviour for module imports and address paths that a file named index will be the default pick if no 
other file is specified. 

Knowing this, we can use import Appointment from "components/Appointment"; to import a component instead of import 
Appointment from "components/Appointment/index";.
*/

import React from 'react';
import './style.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

const Appointment = props => {
  return(
    <article className="appointment">
      <Header time={props.time} />
      {
        props.interview ? 
          <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : 
          <Empty />}
    </article>    
  );
};

export default Appointment;