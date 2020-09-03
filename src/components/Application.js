import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from './Appointment';
import InterviewerListItem from "./InterviewerListItem";

import {getAppointmentsForDay, getInterview} from '../helpers/selectors';


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Hyacinth Brown",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "1pm",
    interview: {
      student: "Sandy Miller",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 6,
    time: "4pm",
    interview: {
      student: "Ken Carter",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }       
];

/* const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
]; */
//day={"Monday"}
//etDay={day => console.log(day)}

export default function Application(props) {
  //const [days, setDays] = useState([]);
  //const [day, setDay] = useState("Monday");
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });//spread and overwrite the day key.
  
  /*const setDays = days => setState(prev =>({...prev, days}));

   useEffect(() => {
    axios.get('http://localhost:8001/api/days')
    .then(results => {
      console.log("days", results.data);
      setDays(results.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []); */

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
  //console.log("days", state.days);
  //console.log("appointments", state.appointments);  
  //console.log("interviewers", state.interviewers);
  const appointmentList = getAppointmentsForDay(state, state.day).map(item => {
    const interview = getInterview(state, item.interview);
    return <Appointment
      key={item.id}
      id={item.id}
      time={item.time}
      interview={interview}
      //{...item}
    />
  })  
  return (
    <main className="layout">
      <section className="sidebar">
        {
          <div>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
              <DayList 
                days={state.days}
                day={state.day}
                setDay={setDay}
              />
            </nav>
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </div>
        }
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
