import React from 'react';
import './List.css';
const List = props => {
  let listItems = null;

  listItems = props.items.map(element => (
    <li className="list-group-item list-group-item-action">{element}</li>
  ));

  return <div className="list-group">{listItems}</div>;
};

export default List;
