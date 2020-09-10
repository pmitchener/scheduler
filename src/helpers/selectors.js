
export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(item => {
    return item.name === day && item;
  });
  if (!dayObj) {
    return [];
  }
  const appointmentArray = dayObj.appointments.map(id => {
    return state.appointments[id];
  });
  return appointmentArray;
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(item => {
    return item.name === day && item;
  });
  if (!dayObj) {
    return [];
  }
  const interviewerArray = dayObj.interviewers.map(id => {
    return state.interviewers[id];
  });
  return interviewerArray;
}

/**
 * 
 * @param {*} state 
 * @param {*} interview {"student": "Archie Cohen", "interviewer": 4}
 */
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {student: interview.student, interviewer: state.interviewers[interview.interviewer]};
}

export function getAppointmentSposForDay(state, day) {
  const dayObj = state.days.find(item => {
    return item.name === day && item;
  });
  if (!dayObj) {
    return 0;
  }
  const spots = dayObj.appointments.filter(id => state.appointments[id].interview === null)
  .reduce((count, el) => count + 1, 0);//give reduce an initial value to start with or it will start at index 1 instead of index 0;
  return spots;
}