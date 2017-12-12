import React from 'react';

const Square = (props) => {
  if (props.wonline && (props.wonline.indexOf(props.index) >= 0))
  {
    return(
      <button className="square winner" onClick={() => props.addSymbol(props.index, props.symbol)}>{props.value}</button> // this.props.value ở đây là giá trị i bên renderSquare(i) của Board
    );
  }
  if (props.draw)
  {
    return(
      <button className="square draw" onClick={() => props.addSymbol(props.index, props.symbol)}>{props.value}</button> // this.props.value ở đây là giá trị i bên renderSquare(i) của Board
    );
  }
  return(
    <button className="square" onClick={() => props.addSymbol(props.index, props.symbol)}>{props.value}</button> // this.props.value ở đây là giá trị i bên renderSquare(i) của Board
  );
};


export default Square;