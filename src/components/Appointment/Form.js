import React, {useState} from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';


const Form = props => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //This is handling youser typing into textbox below
  const handleInput = event => {
    const newName = event.target.value;
    setName(newName);
  };

  //this is handling user click InterviewerListItem from the InterviewerList.
  const onChange = id => {
    setInterviewer(id);
  };

  const reset = () => {
    setName("");
    setError("");
    setInterviewer(null);
  };

  const cancel = () => {
    props.onCancel();
    reset();
  };

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return false;
    }
    return true;
  };

  const save = () => {
    if (validate()) {
      setError("");
      props.onSave(...[name, interviewer]);
    }
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
            value={name}
            onChange={handleInput}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={onChange} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;