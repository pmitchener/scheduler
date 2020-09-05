import {useState, useEffect} from 'react';
import axios from 'axios';

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });//spread and overwrite the day key.

  const bookInterview = (id, interview) => {
    return new Promise((resolve, reject) => {
      console.log("From Application level", id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      }; 
      console.log("saving", appointment);
      axios({
        method: 'put',
        url: `http://localhost:8001/api/appointments/${id}`,
        data: appointment
      })
      .then(response => {
        //updating state.
        console.log("http status", response.status)
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({...state, appointments});
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
    });
  };
  
  const cancelInterview = (id) => {
    return new Promise((resolve, reject) => {
      console.log("cancelInterview From Application level", id);
      axios({
        method: 'delete',
        url: `http://localhost:8001/api/appointments/${id}`,
      })
      .then(response => {
        console.log("Delete from server successfull");
        //set this appoint to null in state
        const appointments = {...state.appointments};
        appointments[id].interview = null;    
        setState({...state, appointments});
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
    });
  };

  useEffect(() => {
    //axios.get('http://localhost:8001/api/days')
    Promise.all(
      [
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/interviewers')
      ]
    )
    .then(resultsArray => {
      console.log("appointments", resultsArray[1].data);
      setState(prev => (
        {
          ...prev, 
          days: resultsArray[0].data, 
          appointments: resultsArray[1].data,
          interviewers: resultsArray[2].data
        }
        ));
    })
    .catch(error => {
      console.log(error);
    });
  }, []);  

  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;