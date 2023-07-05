interface MonkeyType {
  inspectItems: () => void;
  getTotalItemsInspected: () => number;
  receiveThrownItem: (thrownItem: number) => void;
}

export type { MonkeyType };
