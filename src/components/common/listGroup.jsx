import React from "react";

const ListGroup = ({
  items,//genre name list
  textProperty,
  valueProperty,//uniqie id
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className='list-group-item'
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
  
export default ListGroup;