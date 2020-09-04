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
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR = "ERROR";

const savingMessage = "Saving";
const deletingMessage = "Deleting";

const Appointment = props => {
  const {mode, transition, back, message, setErrorMessage} = useVisualMode( props.interview ? SHOW : EMPTY);
  
  const formDataValid = (name, interviewer) => {
    if (!name) {
      setErrorMessage("Please include a student name");
      return false;
    }
    if (!interviewer) {
      setErrorMessage("Please select an interviewer");
      return false;
    }
    return true;
  };

  const onCloseError = () => {
    back();
  };

  const save = (name, interviewer) => {
    if (!formDataValid(name, interviewer) ) {
      transition(ERROR);
      return;
    }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(result => {
      transition(SHOW);
    })
    .catch(error => {
      //display error dialog here
    });
  };  

  const confirmDelete = () => {
    transition(CONFIRM);
  };
  const deleteInterview = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(result =>{
      console.log("deleting successfull. Transition to EMPTY mode");
      transition(EMPTY);
    })
    .catch(error =>{
      //display error dialog here
    });
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
        {mode === ERROR && <Error message={message} onClose={onCloseError} />}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers} 
            onCancel={() => {back()}} 
            onSave={save /*() => {transition(SAVING)} */}
          />
        )}
        {mode === SAVING &&(
          <Status message={savingMessage} />
        )}
        {mode === CONFIRM && (
            <Confirm
            message={"Delete the appointment?"}
            onConfirm={deleteInterview}
            onCancel={() => {back()} }          
          />
        )}
        {mode === DELETING && (
          <Status message={deletingMessage} />
        )}        
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={confirmDelete}
          />
        )}
    </article>    
  );
};

export default Appointment;