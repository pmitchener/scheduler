
//import {useState, useEffect, useReducer} from 'react';
import {getAppointmentSposForDay} from '../helpers/selectors';

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_SPOTS_REMAINING = "SET_SPOTS_REMAINING";

export default function reducer(state, action) {
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
}