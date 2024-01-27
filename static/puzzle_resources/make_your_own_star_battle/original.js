/**
 * this source file will SPOIL the answer to the puzzle!!!
 * and also how the puzzle works!
 * and other stuff!
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

let puzzle;

pzpr.on("load", function () {
  puzzle = new pzpr.Puzzle(document.getElementById("puzzlecanvas"), {
    type: "player",
  });
  puzzle.open("shikaku/5/5");
  puzzle.on("ready", function () {
    puzzle.mouse.inputMode = "border";
  });
});

function getResponse() {
  const ansString = "ANSWERISLOTTERY";
  // prettier-ignore
  const possible = [
    [ [0, 3], [1, 0], [2, 2], [3, 4], [4, 1] ],
    [ [0, 3], [1, 1], [2, 4], [3, 2], [4, 0] ],
    [ [0, 3], [1, 1], [2, 4], [3, 0], [4, 2] ],
    [ [0, 1], [1, 3], [2, 0], [3, 2], [4, 4] ],
    [ [0, 1], [1, 3], [2, 0], [3, 4], [4, 2] ],
    [ [0, 0], [1, 3], [2, 1], [3, 4], [4, 2] ],
    [ [0, 2], [1, 0], [2, 3], [3, 1], [4, 4] ],
    [ [0, 4], [1, 1], [2, 3], [3, 0], [4, 2] ],
    [ [0, 2], [1, 4], [2, 1], [3, 3], [4, 0] ],
    [ [0, 2], [1, 4], [2, 0], [3, 3], [4, 1] ],
    [ [0, 4], [1, 2], [2, 0], [3, 3], [4, 1] ],
    [ [0, 2], [1, 0], [2, 4], [3, 1], [4, 3] ],
    [ [0, 0], [1, 2], [2, 4], [3, 1], [4, 3] ],
    [ [0, 1], [1, 4], [2, 2], [3, 0], [4, 3] ],
  ];
  if (puzzle.check(false)[0] === "bdDeadEnd") {
    return "Your grid isn't divided into regions.";
  }
  const components = Array(5)
    .fill(null)
    .map((_) => Array(5).fill(0));
  const nComponents = puzzle.board.roommgr.components.map((component, i) =>
    component.clist
      .map((cell) => [cell.bx, cell.by].map((c) => Math.floor(c / 2)))
      .map(([x, y]) => {
        components[x][y] = i;
      })
  ).length;
  if (nComponents !== 5) {
    return `Your grid needs to have 5 regions, but it has ${nComponents}.`;
  }
  const letter =
    ansString[
      possible.filter(
        (poss) => new Set(poss.map(([x, y]) => components[x][y])).size === 5
      ).length
    ];
  return `Our solvers have solved your puzzle and extracted the letter ${letter}.`;
}

function onCheck() {
  document.getElementById("response-par").innerText = getResponse();
}

function onClear() {
  puzzle.ansclear();
}
