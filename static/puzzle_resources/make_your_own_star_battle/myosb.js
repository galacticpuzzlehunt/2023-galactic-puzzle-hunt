let puzzle;

pzpr.on("load", function () {
  puzzle = new pzpr.Puzzle(document.getElementById("puzzlecanvas"), {
    type: "player",
  });
  window.myosbPuzzle = puzzle;
  puzzle.open("shikaku/5/5");
  puzzle.on("ready", function () {
    puzzle.mouse.inputMode = "border";
  });
});
