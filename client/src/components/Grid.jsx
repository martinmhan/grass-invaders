import React from 'react';
import Row from './Row.jsx';

const Grid = (props) => {
  const rows = [];
  for (let i = 0; i < props.rows; i += 1) {
    rows.push(i);
  }
  
  return (
    <div className="grid" tabIndex="0" onKeyDown={props.handleKeyDown}>
      {rows.map((row) => (
        <Row 
          gridMatrix={props.gridMatrix}
          cols={props.cols}
          row={row}
          key={row}
        />
      ))}
    </div>
  );
};

export default Grid;
