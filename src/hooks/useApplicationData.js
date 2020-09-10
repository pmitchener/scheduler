import { useEffect, useReducer} from 'react';
import axios from 'axios';
import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_SPOTS_REMAINING} from '../reducers/application';
//import {getAppointmentSposForDay} from '../helpers/selectors';


/* const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS_REMAINING = "SET_SPOTS_REMAINING";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day:action.day };//spread and overwrite the day key.
    case SET_APPLICATION_DATA:
      return {
          ...state, 
          days: action.days, 
          appointments: action.appointments,
          interviewers: action.interviewers
        };
    case SET_INTERVIEW: {
      const appointments = {...state.appointments}; 
      appointments[action.id].interview = action.interview;
      //return {...state, days:action.days, appointments};
      return {...state, appointments};
    }
    case SET_SPOTS_REMAINING: {
       //count all the appointments for that day with interview === null
       const spotsForDay = getAppointmentSposForDay(state, state.day);
       const days = [...state.days].map(day => {
         if (day.name === state.day) {
           day.spots = spotsForDay;
         }
         return day;
       });
       return {...state, days};        
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
} */
/*
function reducer(state, action) {
  if (action.type === "add") {
    return state + action.value;
  }

  if (action.type === "subtract") {
    return state - action.value;
  }

  if (action.type === "multiply") {
    return state * action.value;
  }
  return state;
}
*/

function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

/*  const getAppointmentSposForDay = () => {
   const dayObj = state.days.find(item => {
     return item.name === state.day && item;
   });
   if (!dayObj) {
     return 0;
   }
   const spots = dayObj.appointments.filter(id => state.appointments[id].interview === null)
   .reduce((count, el) => count + 1, 0);//give reduce an initial value to start with or it will start at index 1 instead of index 0;
   return spots;
 } */

 const setDay = day => dispatch({type:SET_DAY, day});//spread and overwrite the day key.

 const bookInterview = (id, interview) => {
   return new Promise((resolve, reject) => {
/*      axios({
       method: 'put',
       url: `http://localhost:8001/api/appointments/${id}`,
       data: {interview}
     }) */
     //The above axious call does not work with the mock test.
     console.log("putting ", {interview});
     axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })     
    .then(response => {
       //updating state.
/*        const appointments = {
         ...state.appointments,
         [id]: appointment
       }; */
       //calculate spots remaining for this day
       //count all the appointments for that day with interview === null
/*        const spotsForDay = getAppointmentSposForDay(state, state.day) - 1;
       const days = [...state.days].map(day => {
         if (day.name === state.day) {
           day.spots = spotsForDay;
         }
         return day;
       });  */     
       //
       //setState({...state, days, appointments});
       //dispatch({type:SET_INTERVIEW, days, id, interview})
       dispatch({type:SET_INTERVIEW, id, interview})
       dispatch({type:SET_SPOTS_REMAINING});
       //console.log("bookInterview resolving");
       resolve(response);
     })
     .catch(error => {
       //console.log("bookInterviewError:", error);
       reject(error);
     });
   });
 };
 
 const cancelInterview = (id) => {
   return new Promise((resolve, reject) => {
/*      axios({
       method: 'delete',
       url: `http://localhost:8001/api/appointments/${id}`,
     }) */
     axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(response => {
       //set this appoint to null in state
       const appointments = {...state.appointments};
       appointments[id].interview = null;  

       //cannot use spotsForDay + 1 here. the line above setting the interview object to null seems to have and effect
/*        const spotsForDay = getAppointmentSposForDay(state, state.day);
       const days = [...state.days].map(day => {
         if (day.name === state.day) {
           day.spots = spotsForDay;
         }
         return day;
       });  */ 
       
       //setState({...state, days, appointments});
       //dispatch({type:SET_INTERVIEW, days, appointments})
       //dispatch({type:SET_INTERVIEW, days, id, interview:null})
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
   //axios.get('http://localhost:8001/api/days')
   Promise.all(
     [
       axios.get('http://localhost:8001/api/days'),
       axios.get('http://localhost:8001/api/appointments'),
       axios.get('http://localhost:8001/api/interviewers')
     ]
   )
   .then(resultsArray => {
/*      setState(prev => (
       {
         ...prev, 
         days: resultsArray[0].data, 
         appointments: resultsArray[1].data,
         interviewers: resultsArray[2].data
       }
       )); */
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

/* goe working copy before reducer
function useApplicationData() {
   const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const getAppointmentSposForDay = () => {
    const dayObj = state.days.find(item => {
      return item.name === state.day && item;
    });
    if (!dayObj) {
      return 0;
    }
    const spots = dayObj.appointments.filter(id => state.appointments[id].interview === null)
    .reduce((count, el) => count + 1, 0);//give reduce an initial value to start with or it will start at index 1 instead of index 0;
    return spots;
  }

  const setDay = day => setState({ ...state, day });//spread and overwrite the day key.

  const bookInterview = (id, interview) => {
    return new Promise((resolve, reject) => {
      const appointment = {...state.appointments[id], interview: { ...interview } }; 
      axios({
        method: 'put',
        url: `http://localhost:8001/api/appointments/${id}`,
        data: appointment
      })
      .then(response => {
        //updating state.
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        //calculate spots remaining for this day
        //count all the appointments for that day with interview === null
        const spotsForDay = getAppointmentSposForDay(state, state.day) - 1;
        const days = [...state.days].map(day => {
          if (day.name === state.day) {
            day.spots = spotsForDay;
          }
          return day;
        });      
        //
        setState({...state, days, appointments});
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
      axios({
        method: 'delete',
        url: `http://localhost:8001/api/appointments/${id}`,
      })
      .then(response => {
        //set this appoint to null in state
        const appointments = {...state.appointments};
        appointments[id].interview = null;  

        //cannot use spotsForDay + 1 here. the line above setting the interview object to null seems to have and effect
        const spotsForDay = getAppointmentSposForDay(state, state.day);
        const days = [...state.days].map(day => {
          if (day.name === state.day) {
            day.spots = spotsForDay;
          }
          return day;
        });  
        
        setState({...state, days, appointments});

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
}*/

export default useApplicationData;