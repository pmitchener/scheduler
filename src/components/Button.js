import React from "react";
import "components/Button.scss";
const classNames = require('classnames');

//could not export if this was an arrow function. arraow functions are expressins and you cannot export expressions.
//you would have to call export functionName at the bottom.
export default function Button(props) {
  let buttonClass = classNames("button", {'button--confirm' : props.confirm, 'button--danger' : props.danger});

  return (
    <button className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
