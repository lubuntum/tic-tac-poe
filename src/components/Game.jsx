import { useState } from "react";
import Board from "./Board";
export default function Game(){
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length-1];
    
    function handlePlay(nextSquares){
        setHistory([...history, nextSquares]);
        setIsNext(!isNext);
    }
    

    /*
    function lightUpWinner(winSquares){
        const nextLight = light.slice();
        winSquares.map(s=>{nextLight[s] = "win-light"});
        setLight(nextLight)
    }
    */
    return(
        <div className="game">
            <div className="game-board">
                <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                {history.map(squares =>{return <li>{squares}</li>})}
            </div>
        </div>
    )
}