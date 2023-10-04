export const comparePackets = (
  leftPacket: number | Array<any>,
  rightPacket: number | Array<any>,
): string => {
  // Both packets are numbers
  if (typeof leftPacket === "number" && typeof rightPacket === "number") {
    if (leftPacket < rightPacket) {
      return "right order";
    } else if (leftPacket > rightPacket) {
      return "wrong order";
    }
    return "indeterminate order";
  }
  //  Both packets are arrays
  if (Array.isArray(leftPacket) && Array.isArray(rightPacket)) {
    while (leftPacket.length > 0 && rightPacket.length > 0) {
      const result = comparePackets(leftPacket.shift(), rightPacket.shift());
      switch (result) {
        case "right order":
          return "right order";
        case "wrong order":
          return "wrong order";
        default:
      }
    }
    if (rightPacket.length > 0) {
      return "right order";
    } else if (leftPacket.length > 0) {
      return "wrong order";
    }
    return "indeterminate order";
  }
  // Left packet is a number, right packet is an array
  if (typeof leftPacket === "number") {
    return comparePackets([leftPacket], rightPacket);
  }
  // Right packet is a number, left packet is an array
  if (typeof rightPacket === "number") {
    return comparePackets(leftPacket, [rightPacket]);
  }
  throw new Error(
    `Packets ${leftPacket} and ${rightPacket} are not comparable`,
  );
};
