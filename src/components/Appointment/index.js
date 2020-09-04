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
import Form from './Form';
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

const Appointment = props => {
  const {mode, transition, back} = useVisualMode( props.interview ? SHOW : EMPTY);
  console.log("mode", mode);
  return(
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
        {mode === CREATE && <Form interviewers={[]} onCancel={() => {back(EMPTY)}} onSave={() => {transition(SAVING)}} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
    </article>    
  );
};

export default Appointment;