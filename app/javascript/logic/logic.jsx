export const checkWin= (board) => {
  const winLines = [
    [0, 1, 2, 3, 4]
  ];
  const maxtrixLength = Math.sqrt(board.length);
  for(let i = 0; i < board.length; i++)
  {
    // check rows
    if (((i%maxtrixLength+4) < maxtrixLength) && (i != 0)) 
    {
      const line = [ i,  i + 1,  i + 2,  i + 3,  i + 4]
      winLines.push(line);
    }
    // check cols
    if ((i+maxtrixLength*4) < board.length)
    {
      const line = [ i,  i + maxtrixLength,  i + maxtrixLength*2,  i + maxtrixLength*3,  i + maxtrixLength*4]
      winLines.push(line);      
    }
    //check right stants
    if (((i+(maxtrixLength+1)*4) < board.length) && ((i%maxtrixLength+4) < maxtrixLength))
    {
      const line = [ i,  i + maxtrixLength + 1,  i + (maxtrixLength+1)*2,  i + (maxtrixLength+1)*3,  i + (maxtrixLength+1)*4]
      winLines.push(line);      
    }
    // check left stants
    if (((i+(maxtrixLength-1)*4) < board.length) && ((i%maxtrixLength+4) > maxtrixLength))
    {
      const line = [ i,  i + (maxtrixLength-1),  i + (maxtrixLength-1)*2,  i + (maxtrixLength-1)*3,  i + (maxtrixLength-1)*4]
      winLines.push(line);      
    }
  }
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c, d, e] = winLines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d] && board[a] === board[e]) {
      return [a, b, c, d, e];
    }
  }
  return null;
};