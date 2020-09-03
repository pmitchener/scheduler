import React from "react";
import "components/Button.scss";
const classNames = require('classnames');

//could not expor if this was an arrow function. arraow functions are expressins and you cannot export expressions.
//you would have to call export functionName at the bottom.
export default function Button(props) {
   let buttonClass = classNames("button", {'button--confirm' : props.confirm, 'button--danger' : props.danger});
   /*if (props.confirm) {
      buttonClass += " button--confirm";
   } else if (props.danger) {
      buttonClass += props.danger && " button--danger"; 
   }*/
   //const buttonClick = props.disabled ? null : props.onClick;
   //buttonClass = props.confirm && "button button--confirm";
   return(
      <button className={buttonClass}  
      onClick={props.onClick}
      disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
