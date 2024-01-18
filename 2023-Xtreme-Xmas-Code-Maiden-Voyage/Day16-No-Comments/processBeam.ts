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

  currentTile.energized = true;

  switch (currentTile.contains) {
    case `empty space`:
      processBeamInEmptySpace(
        grid,
        currentTileCoordinates,
        beamIsTravelingToThe,
      );
      break;
    case `mirror slash`:
      processBeamHittingSlashMirror(
        grid,
        currentTileCoordinates,
        beamIsTravelingToThe,
      );
      break;
    case `mirror backslash`:
      processBeamHittingBackslashMirror(
        grid,
        currentTileCoordinates,
        beamIsTravelingToThe,
      );
      break;
    case "splitter vertical":
      processBeamHittingVerticalSplitter(
        grid,
        currentTileCoordinates,
        beamIsTravelingToThe,
      );
      break;
    case "splitter horizontal":
      processBeamHittingHorizontalSplitter(
        grid,
        currentTileCoordinates,
        beamIsTravelingToThe,
      );
      break;
  }
};
