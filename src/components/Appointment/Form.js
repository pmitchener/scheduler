import React, {useState} from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';


const Form = props => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //This is handling youser typing into textbox below
  const handleInput = event => {
    console.log("handleInput", event.target.value);
    const newName = event.target.value;
    setName(newName)
  };

  //this is handling user click InterviewerListItem from the InterviewerList.
  const onChange = id => {
    console.log("onChange in Form", id);
    setInterviewer(id);
  };

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = () => {
    props.onSave(...[name, interviewer]);
  };
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
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
        <InterviewerList interviewers={[]} value={interviewer} onChange={onChange} />
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