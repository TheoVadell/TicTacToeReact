import { useState } from 'react';

// Composant fonctionnel représentant un carré dans le jeu Tic Tac Toe
function Square({ value, onSquareClick }) {
  return (
    // Bouton représentant un carré avec la valeur et la fonction de clic
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Composant fonctionnel représentant le tableau de jeu Tic Tac Toe
function Board({ xIsNext, squares, onPlay }) {

  // Fonction gérant le clic sur un carré
  function handleClick(i) {
    // Vérifie si le carré est déjà rempli ou s'il y a un gagnant
    if (squares[i] || calculateWinner(squares)) {
      return; 
    }

    // Crée une nouvelle copie du tableau de carrés
    const nextSquares = squares.slice();

    // Détermine le prochain joueur et met à jour le tableau de carrés
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // Appelle la fonction de gestion du jeu avec le nouveau tableau de carrés
    onPlay(nextSquares);
  }

  // Détermine s'il y a un gagnant ou si c'est le tour du prochain joueur
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner + " a gagné";
  } else {
    status = "Prochain Tour: " + (xIsNext ? "X" : "O");
  }

  // Rendu du composant Board avec les carrés et le statut
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Composant fonctionnel principal représentant le jeu Tic Tac Toe
export default function Game() {
  // État pour suivre l'historique des carrés
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // État pour suivre le coup actuel
  const [currentMove, setCurrentMove] = useState(0);
  // Détermine si c'est au tour du joueur X ou O
  const xIsNext = currentMove % 2 === 0;
  // Récupère le tableau de carrés actuel à partir de l'historique
  const currentSquares = history[currentMove];

  // Fonction appelée lorsqu'un joueur effectue un coup
  function handlePlay(nextSquares) {
    // Met à jour l'historique avec le nouveau tableau de carrés
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // Met à jour le coup actuel
    setCurrentMove(nextHistory.length - 1);
  }
  
  // Fonction pour changer de coup dans l'historique
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Génère une liste de boutons pour chaque coup dans l'historique
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Aller au coup #' + move;
    } else {
      description = 'Revenir au début';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  // Rendu du composant Game avec le tableau de jeu Board et l'historique des coups
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Fonction utilitaire pour calculer s'il y a un gagnant dans le tableau de carrés
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Parcourt chaque ligne pour vérifier s'il y a un gagnant
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Vérifie si les valeurs dans les carrés de cette ligne sont identiques et non nulles
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Renvoie le joueur (X ou O) qui a gagné
    }
  }
  return null; // Renvoie null s'il n'y a pas de gagnant
}
