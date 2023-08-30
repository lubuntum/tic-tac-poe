import { useState } from "react";
import Board from "./Board";
export default function Game(){
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [light, setLight] = useState(Array(9).fill("basic-light"))
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    
    function handlePlay(nextSquares){
        //Убераем прошлые ходы и обновляем историю
        const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
        setIsNext(!isNext);

        //setHistory([...history, nextSquares]);
        //setIsNext(!isNext);
    }
    
    function lightWinSquares(winSquares){
        const nextLight = light.slice();
        winSquares.map(s=>{nextLight[s] = "win-light"});
        setLight(nextLight);
    }
    function jumpTo(nextMove){
        setCurrentMove(nextMove);
        setIsNext(nextMove % 2 === 0);
        const nextLight = light.slice();
        nextLight.forEach((value, i)=>{
            if(value==="win-light") nextLight[i] = "basic-light";//ошибка
        });
        setLight(nextLight);
    }

    const moves = history.map((squares, move)=>{
        let desc;
        move > 0 ? desc = "Go to move #" + move: desc = "Go to start";
        return (
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return(
        <div className="game">
            <div className="game-board">
                <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} light={light} lightWinSquares={lightWinSquares}/>
            </div>
            <div className="game-info">
                {moves}
            </div>
        </div>
    )
}