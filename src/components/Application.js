import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from './Appointment';
import userApplicationData from '../hooks/useApplicationData';

import {getAppointmentsForDay, getInterviewersForDay, getInterview} from '../helpers/selectors';
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
    />;
  });
  appointmentList.push(<Appointment key="last" id="last" time="5pm" />);//add this so that the last spot is from 4pm to 5pm
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
