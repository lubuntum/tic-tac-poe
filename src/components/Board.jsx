import "../styles/app.css"
import { useState } from "react";
function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    let result;
    lines.map(line => {
        const [a,b,c] = line;
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        //складываем в отчет кто победил и где(номера квадратов)
        result = {"result":squares[a], "winSquares":[a,b,c]};
    });
    return result ;
}
function Square({value, onSquareClick, colorLight}){
    
    return <button onClick={onSquareClick} className={"square " + colorLight}>{value}</button>;
}
export default function Board({isNext, squares, onPlay}){
    //const [squares, setSquares] = useState(Array(9).fill(null));
    const [light, setLight] = useState(Array(9).fill("basic-light"))
    //const [isNext, setIsNext] = useState(true);
    function handleClick(i){
        if(squares[i] || calculateWinner(squares)) return;
        const nextSquares = squares.slice();
        if(isNext) nextSquares[i] = "X";
        else nextSquares[i] = "O";

        let result = calculateWinner(nextSquares);
        if(result)
            lightWinSquares(result["winSquares"]);
        onPlay(nextSquares);
        //setIsNext(!isNext);
        //setSquares(nextSquares);
    }
    function lightWinSquares(winSquares){
        const nextLight = light.slice();
        winSquares.map(s=>{nextLight[s] = "win-light"});
        setLight(nextLight);
    }
    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status = "Winner is " + winner["result"];
        //const nextLight = light.slice();
        //winner["winSquares"].map(s=>{nextLight[s] = "win-light"});
        //setLight(nextLight)
        //получаем номера выйгрышных квадратов и подсвечиваем их
        //winner["winSquares"].map(s=>{light[s] = "win-light"}); //нужно set
        //lightWinner(winner["winSquares"]);
    }
    else status = "Player move: " + (isNext ? "X" : "O");
    return(
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={()=>handleClick(0)} colorLight={light[0]} />
                <Square value={squares[1]} onSquareClick={()=>handleClick(1)} colorLight={light[1]}/>
                <Square value={squares[2]} onSquareClick={()=>handleClick(2)} colorLight={light[2]}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={()=>handleClick(3)} colorLight={light[3]}/>
                <Square value={squares[4]} onSquareClick={()=>handleClick(4)} colorLight={light[4]}/>
                <Square value={squares[5]} onSquareClick={()=>handleClick(5)} colorLight={light[5]}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={()=>handleClick(6)} colorLight={light[6]}/>
                <Square value={squares[7]} onSquareClick={()=>handleClick(7)} colorLight={light[7]}/>
                <Square value={squares[8]} onSquareClick={()=>handleClick(8)} colorLight={light[8]}/>
            </div>
        </>
    )
}