import React from "react";
import './DayListItem.scss';

const classNames = require('classnames');

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {'day-list__item--selected' : props.selected, 'day-list__item--full' : props.spots === 0});

  const fromatSpots = spots => {
    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    return `${spots} spots remaining`;
  };
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day" >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{fromatSpots(props.spots)}</h3>
    </li>
  );
}