import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from './Appointment';
//import InterviewerListItem from "./InterviewerListItem";
import userApplicationData from '../hooks/useApplicationData';

import {getAppointmentsForDay, getInterviewersForDay, getInterview} from '../helpers/selectors';

/* const appointments = [
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
]; */

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
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = userApplicationData();
  
  const interviewersForDay = getInterviewersForDay(state, state.day);
  const appointmentList = getAppointmentsForDay(state, state.day).map(item => {
    const interview = getInterview(state, item.interview);
    return <Appointment
      key={item.id}
      id={item.id}
      time={item.time}
      interview={interview}
      interviewers={interviewersForDay}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  });  
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
