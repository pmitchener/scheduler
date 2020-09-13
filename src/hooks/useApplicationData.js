import { useEffect, useReducer} from 'react';
import axios from 'axios';
import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_SPOTS_REMAINING} from '../reducers/application';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
 const setDay = day => dispatch({type:SET_DAY, day});//spread and overwrite the day key.

 const bookInterview = (id, interview) => {
   return new Promise((resolve, reject) => {
     axios.put(`/api/appointments/${id}`, { interview })     
    .then(response => {
       dispatch({type:SET_INTERVIEW, id, interview})
       dispatch({type:SET_SPOTS_REMAINING});
       resolve(response);
     })
     .catch(error => {
       reject(error);
     });
   });
 };
 
 const cancelInterview = (id) => {
   return new Promise((resolve, reject) => {
     axios.delete(`/api/appointments/${id}`)
    .then(response => {
       const appointments = {...state.appointments};
       appointments[id].interview = null;  
       dispatch({type:SET_INTERVIEW, id, interview:null})
       dispatch({type:SET_SPOTS_REMAINING});
       resolve(response);
     })
     .catch(error => {
       console.log(error);
       reject(error);
     });
   });
 };

 useEffect(() => {
   Promise.all(
     [
       axios.get('/api/days'),
       axios.get('/api/appointments'),
       axios.get('/api/interviewers')
     ]
   )
   .then(resultsArray => {
       dispatch({ type: SET_APPLICATION_DATA, days: resultsArray[0].data, 
        appointments: resultsArray[1].data,
        interviewers: resultsArray[2].data });
   })
   .catch(error => {
     console.log(error);
   });
 }, []);  

 return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;