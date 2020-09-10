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
const EDIT = "EDIT";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR = "ERROR";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const savingMessage = "Saving";
const deletingMessage = "Deleting";

const Appointment = props => {
  const {mode, transition, back, message, setErrorMessage} = useVisualMode( props.interview ? SHOW : EMPTY);
  
  //console.log("mode", mode, "Interviewer", props.interview ? props.interview.interviewer : "");
/*   const formDataValid = (name, interviewer) => {
    if (!name) {
      setErrorMessage("Please include a student name");
      return false;
    }
    if (!interviewer) {
      setErrorMessage("Please select an interviewer");
      return false;
    }
    return true;
  }; */

  const onCloseError = () => {
    back();
  };

  const edit = () => {
    transition(EDIT);
  }

  const save = (name, interviewer) => {
    /* comment out for jtest "validates that the student name is not blank"
    if (!formDataValid(name, interviewer) ) {
      transition(ERROR); 
      return;
    } */
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(error => {
      //display error dialog here
      setErrorMessage("Could not save appointment.");
      transition(ERROR_SAVE, true);
    });
  };  

  const confirmCancelInterview 
   = () => {
    transition(CONFIRM);
  };
  const cancelInterview = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() =>{
      transition(EMPTY);
    })
    .catch(error =>{
      //display error dialog here
      setErrorMessage("Could not cancel appointment.");
      transition(ERROR_DELETE, true);      
    });
  }

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
        {(mode === ERROR  || mode === ERROR_SAVE || mode === ERROR_DELETE) && <Error message={message} onClose={onCloseError} />}
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
            message={"Are you sure you would like to cancel this appointment?"}
            onConfirm={cancelInterview}
            onCancel={() => {back()} }          
          />
        )}
        {mode === DELETING && (
          <Status message={deletingMessage} />
        )}  
        {mode === EDIT && (
            <Form
              name={props.interview.student}
              interviewers={props.interviewers}
              interviewer={props.interview.interviewer.id}
              onCancel={() => {back()}}
              onSave={save}
          />          
        )}      
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={edit}
            onDelete={confirmCancelInterview
            }
          />
        )}
    </article>    
  );
};

export default Appointment;