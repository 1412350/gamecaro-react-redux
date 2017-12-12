import React, { Component } from 'react';
import { addSymbol, startAgain, jumpToMove, reverseMoves } from '../actions/actions';
import { connect } from 'react-redux';
import Square from './Square'

class Board extends Component {
  addSymbol (index, symbol) {
    const history = this.props.history.slice(0, this.props.stepNum + 1);
    const current = history[history.length - 1];
    !current.won && this.props.addSymbol(index, symbol);
  }
  jumpToMove(move) {
    this.props.jumpToMove(move);
  }
  renderSquare(i){
    const history = this.props.history.slice(0, this.props.stepNum + 1);
    const current = history[history.length - 1];
    return <Square value={current.board[i]} wonline={current.wonLine} addSymbol={this.addSymbol.bind(this)} symbol={this.props.turn} index={i}/>
  }
  
  render(){
    // render maxtrix N*N
    const history = this.props.history.slice(0, this.props.stepNum + 1);
    const current = history[history.length - 1];
    const matrixSize = Math.sqrt(current.board.length); // Lấy kích cỡ của ma trận bằng props gửi từ Game qua
    const rows = Array(matrixSize).fill(null); // Tạo rows là một Array để tiện sử dụng hàm map()
    const cols = rows; // Ma trận vuông nên cols = rows
    const board = rows.map((row, i) => {
      const squares = cols.map((col, j) => {
        const squareKey = i * matrixSize + j;
        return <span key={squareKey}>{this.renderSquare(squareKey)}</span>; // Chúng ta đang sử dụng vòng lặp trong reactJS nên phải có key cho mỗi phần tử
      });
      return <div className="board-row" key={i}>{squares}</div> // Tương tự như trên
    });
    const moves = this.props.history.map((step, move) => {
      const description = move ? `Move #${move} (${step.moveLocation})` : 'Game start'; // Thêm moveLocation vào
      return <li key={move}><a onClick={this.jumpToMove.bind(this,move)}>{description}</a></li>
    });
    //
    return(
      <div>
        <div>Board</div>
        <div>{board}</div>
        {current.won ? <p>yay! Winner is {current.won}</p> : current.draw ? <p>We have a draw!!!</p> : <p> Next player is {this.props.turn} </p>}
        <ol reversed={this.props.isReversed ? 'reverse' :''}>{this.props.isReversed ? moves.reverse() : moves}</ol>
        <button onClick={() => this.props.reverseMoves()}>Reverse list</button>
        <button onClick={() => this.props.startAgain()}>Reset game</button>        
      </div>
    );
  }
}

export default connect(
  ({history, turn, won, draw, wonLine, stepNum, isReversed}) => ({
    history, turn, won, draw, wonLine, stepNum, isReversed
  }),
  (dispatch) => {
    return {
      addSymbol (index, symbol) {
        dispatch(addSymbol(index, symbol));
      },
      jumpToMove (move) {
        dispatch(jumpToMove(move));
      },
      reverseMoves () {
        dispatch(reverseMoves());
      },
      startAgain () {
        dispatch(startAgain());
      }
    };
  }
)(Board);
