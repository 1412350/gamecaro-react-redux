import * as _ from 'lodash';
import {checkWin} from '../logic/logic'

export const initialState = {
  history: [{
    board: Array(49).fill(""), //Dung mang 1 chieu gom N*N phan tu thay cho ma tran N*N
    moveLocation: '',
    won: undefined,
    wonLine: undefined,
    draw: false,
      }], 
  turn: 'O',  
  stepNum: 0,
  isReversed: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SYMBOL':
    {
      const {index, symbol} = action;
      const newState = _.cloneDeep(state);
      const newindex = index;
      const matrixSize = Math.sqrt(newState.history[0].board.length);
      const moveLocation = [Math.floor(newindex / matrixSize) + 1, (newindex % matrixSize) + 1].join(", ");
      const history = newState.history.slice(0, newState.stepNum + 1);
      const current = history[history.length - 1];
      const cboard = history[history.length - 1].board.slice();  
      
      if ((cboard[newindex] !== "") || current.won)
      {
        return state;
      }
      cboard[newindex] = symbol;
      newState.stepNum = newState.stepNum + 1;
      const Result = checkWin(cboard);   
      if (Result) {
        switch(cboard[Result[0]])
        {
          case 'X':
            current.won = 'X';
            break;
          case 'O':
            current.won = 'O';          
            break;
        }
        current.wonLine = Result;   
      }
      if (!Result)
      {
        newState.turn = symbol === 'X'  ? 'O' : 'X'
      }
      const boardIsFull = cboard.filter(symbol => symbol !== '').length === 49;
      console.log(cboard.filter(symbol => symbol !== '').length);
      if (boardIsFull && !current.won !== 'X') {
        current.draw = true;
      }
      newState.history = history.concat([{ // Thêm history mỗi khi click vào ô vuông
        board: cboard,
        moveLocation: moveLocation,
        won: current.won,
        wonLine: current.wonLine,
        draw: current.draw,
      }]);    
      return newState;
    }
    case 'JUMP_TO_MOVE':
    {
      const {move} = action;
      const temp = _.cloneDeep(state);
      temp.stepNum = move;
      temp.turn = (temp.stepNum % 2) != 0 ? 'X' : 'O'
      temp.history[temp.history.length - 2].won = undefined;
      temp.history[temp.history.length - 2].wonLine = undefined;      
      return temp;
    }
    case 'REVERSE_MOVES':
    {
      const temp = _.cloneDeep(state);
      temp.isReversed = !temp.isReversed;    
      return temp;
    }
    case 'START_AGAIN':
      return initialState;
    default:
      return state;
  }
};