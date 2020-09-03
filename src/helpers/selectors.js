
export function getAppointmentsForDay(state, day) {
  const filteredArray = state.days.filter(item => {
    return item.name === day && item;
  });
  if (!filteredArray) {
    return [];
  }
  if (Array.isArray(filteredArray) && filteredArray.length === 0) {
    return [];
  }
  const appointmentArray = filteredArray[0].appointments.map(id => {
    return state.appointments[id];
  });
  return appointmentArray;
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
/* should return null or
{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
*/

//export = {getAppointmentsForDay, getInterview};