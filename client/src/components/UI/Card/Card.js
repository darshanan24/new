import React from 'react';
import './Card.css';
const card = props => (
  <div className="card">
    <div className="card-header">{props.heading}</div>
    <div className="card-body">{props.children}</div>
  </div>
);

export default card;
