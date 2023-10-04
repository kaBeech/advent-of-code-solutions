import { Packet } from "./types.ts";

export const comparePacketsPart2 = (
  leftPacket: string | Packet,
  rightPacket: string | Packet,
): number => {
  if (typeof leftPacket === "string") {
    leftPacket = JSON.parse(leftPacket as string) as Packet;
  }
  if (typeof rightPacket === "string") {
    rightPacket = JSON.parse(rightPacket as string) as Packet;
  }
  // Both packets are numbers
  if (typeof leftPacket === "number" && typeof rightPacket === "number") {
    if (leftPacket < rightPacket) {
      return -1;
    } else if (leftPacket > rightPacket) {
      return 1;
    }
    return 0;
  }
  //  Both packets are arrays
  if (Array.isArray(leftPacket) && Array.isArray(rightPacket)) {
    while (leftPacket.length > 0 && rightPacket.length > 0) {
      const result = comparePacketsPart2(
        leftPacket.shift()!,
        rightPacket.shift()!,
      );
      switch (result) {
        case -1:
          return -1;
        case 1:
          return 1;
        default:
      }
    }
    if (rightPacket.length > 0) {
      return -1;
    } else if (leftPacket.length > 0) {
      return 1;
    }
    return 0;
  }
  // Left packet is a number, right packet is an array
  if (typeof leftPacket === "number") {
    return comparePacketsPart2([leftPacket], rightPacket);
  }
  // Right packet is a number, left packet is an array
  if (typeof rightPacket === "number") {
    return comparePacketsPart2(leftPacket, [rightPacket]);
  }
  throw new Error(
    `Packets ${leftPacket} and ${rightPacket} are not comparable`,
  );
};
