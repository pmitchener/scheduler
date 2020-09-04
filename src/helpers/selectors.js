

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
