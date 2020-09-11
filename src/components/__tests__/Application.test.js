import React from "react";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  waitForElementToBeRemoved,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";
import axios from 'axios';
import reducer from "reducers/application";

//afterEach(cleanup);

it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});

it("shows the delete error when failing to delete an appointment", () => {
  axios.delete.mockRejectedValueOnce();
});
/* it("renders without crashing", () => {
  render(<Application />);
}); */

describe("Application", () => {
  beforeEach(cleanup);
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"));
  });  

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  }); 
  
  it("defaults to Monday and changes the schedule when a new day is selected using Async Wait method", async() => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  }); 
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() =>{
    const {container, debug} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    
    //1. Click Add button on form
    fireEvent.click(getByAltText(appointment, "Add"));
    
    //2. Enter student name.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //3. click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    //4. /save the appointment
    fireEvent.click(getByText(appointment, "Save"));
    
    //Check that the element with the text "Saving" is displayed. 
    expect(getByText(appointment, "Saving")).toBeInTheDocument(); 
    
    //wait for saving indicator to be removed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    
    //wait for "Lydia Miller-Jones"
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const selectedDay = getAllByTestId(container, 'day').find(day => queryByText(day, "Monday"));
    expect(selectedDay).toHaveTextContent("no spots remaining");
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() =>{
    const {container} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const selectedAppointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    
    //click the delete button
    fireEvent.click(getByAltText(selectedAppointment, "Delete"));
    
    //wait for confirm delete
    await waitForElement(() => getByText(selectedAppointment, /are you sure you would like to cancel this appointment?/i))

    //click confirm on the delete confirm dialog
    fireEvent.click(getByText(selectedAppointment, "Confirm"));

    //wait for the deleting status to removed
    await waitForElementToBeRemoved(() => getByText(selectedAppointment, "Deleting"));

    //wait for element with add button to be displayed
    await waitForElement(() => getByAltText(selectedAppointment, "Add"));

    const selectedDay = getAllByTestId(container, 'day').find(day => queryByText(day, "Monday"));
    expect(selectedDay).toHaveTextContent("2 spots remaining");    
   });  

   it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() =>{
    const {container} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const selectedAppointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    
    //click the edit button
    fireEvent.click(getByAltText(selectedAppointment, "Edit"));

    //1. click an interviewer in the list
    fireEvent.click(getByAltText(selectedAppointment, "Tori Malcolm"));

    //2. Edit student name.
    fireEvent.change(getByPlaceholderText(selectedAppointment, /enter student name/i), {
      target: { value: "Rick Dorsey" }
    });    

    //3. /save the appointment
    fireEvent.click(getByText(selectedAppointment, "Save"));
    
    //Check that the element with the text "Saving" is displayed. 
    expect(getByText(selectedAppointment, "Saving")).toBeInTheDocument(); 
    
    //wait for saving indicator to be removed.
    await waitForElementToBeRemoved(() => getByText(selectedAppointment, "Saving"));
    
    //wait for "Lydia Miller-Jones"
    await waitForElement(() => getByText(selectedAppointment, "Rick Dorsey"));
    
    const selectedDay = getAllByTestId(container, 'day').find(day => queryByText(day, "Monday"));
    expect(selectedDay).toHaveTextContent("1 spot remaining");    
   });

   it("shows the save error when failing to save an appointment", async() =>{
    const {container} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const selectedAppointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    
    //click the edit button
    fireEvent.click(getByAltText(selectedAppointment, "Edit"));

    //1. click an interviewer in the list
    fireEvent.click(getByAltText(selectedAppointment, "Tori Malcolm"));

    //2. Edit student name.
    fireEvent.change(getByPlaceholderText(selectedAppointment, /enter student name/i), {
      target: { value: "Rick Dorsey" }
    });    

    //3. /save the appointment
    fireEvent.click(getByText(selectedAppointment, "Save"));
    
    //Check that the element with the text "Saving" is displayed. 
    expect(getByText(selectedAppointment, "Saving")).toBeInTheDocument(); 
    
    //wait for saving indicator to be removed.
    await waitForElementToBeRemoved(() => getByText(selectedAppointment, "Saving"));
    
    expect(getByText(selectedAppointment, /could not save appointment/i)).toBeInTheDocument(); 
   });

   it("shows the delete error when failing to delete an existing appointment", async() =>{
    const {container} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const selectedAppointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    
    //click the delete button
    fireEvent.click(getByAltText(selectedAppointment, "Delete"));
    
    //wait for confirm delete
    await waitForElement(() => getByText(selectedAppointment, /are you sure you would like to cancel this appointment?/i))

    //click confirm on the delete confirm dialog
    fireEvent.click(getByText(selectedAppointment, "Confirm"));

    //Check that the element with the text "Deleting" is displayed. 
    expect(getByText(selectedAppointment, "Deleting")).toBeInTheDocument();     
    
    //wait for the deleting status to removed
    await waitForElementToBeRemoved(() => getByText(selectedAppointment, "Deleting"));

    expect(getByText(selectedAppointment, /could not cancel appointment/i)).toBeInTheDocument();  
    //console.log(prettyDOM(selectedAppointment));
   });
});

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});
