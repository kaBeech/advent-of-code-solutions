import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import processBeamHittingBackslashMirror from "./processBeamHittingBackslashMirror.ts";
import processBeamHittingHorizontalSplitter from "./processBeamHittingHorizontalSplitter.ts";
import processBeamHittingSlashMirror from "./processBeamHittingSlashMirror.ts";
import processBeamHittingVerticalSplitter from "./processBeamHittingVerticalSplitter.ts";
import processBeamInEmptySpace from "./processBeamInEmptySpace.ts";
import { Grid } from "./types.ts";

export default (
  grid: Grid,
  currentTileCoordinates: XYCoordinates,
  beamIsTravelingToThe: CardinalDirection,
) => {
  const currentTile = grid[currentTileCoordinates.y][currentTileCoordinates.x];

  if (currentTile.isFullyProcessed) return;

  currentTile.isEnergized = true;

  switch (currentTile.contains) {
    case `empty space`:
      processBeamInEmptySpace(
        grid,
        currentTile,
        beamIsTravelingToThe,
      );
      break;
    case `mirror slash`:
      processBeamHittingSlashMirror(
        grid,
        currentTile,
        beamIsTravelingToThe,
      );
      break;
    case `mirror backslash`:
      processBeamHittingBackslashMirror(
        grid,
        currentTile,
        beamIsTravelingToThe,
      );
      break;
    case "splitter vertical":
      processBeamHittingVerticalSplitter(
        grid,
        currentTile,
        beamIsTravelingToThe,
      );
      break;
    case "splitter horizontal":
      processBeamHittingHorizontalSplitter(
        grid,
        currentTile,
        beamIsTravelingToThe,
      );
      break;
  }
};
