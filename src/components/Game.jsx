import { useState } from "react";
import Board from "./Board";
export default function Game(){
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [light, setLight] = useState(Array(9).fill("basic-light"))
    const currentSquares = history[history.length-1];
    
    function handlePlay(nextSquares){
        setHistory([...history, nextSquares]);
        setIsNext(!isNext);
    }
    
    function lightWinSquares(winSquares){
        const nextLight = light.slice();
        winSquares.map(s=>{nextLight[s] = "win-light"});
        setLight(nextLight);
    }
    function jumpTo(nextMove){
        
    }

    const moves = history.map((squares, move)=>{
        let desc;
        move > 0 ? desc = "Go to move #" + move: desc = "Go to start";
        return (
            <li>
                <buttom onClick={()=>jumpTo(move)}>{desc}</buttom>
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