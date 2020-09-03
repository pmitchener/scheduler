
export default function getAppointmentsForDay(state, day) {
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