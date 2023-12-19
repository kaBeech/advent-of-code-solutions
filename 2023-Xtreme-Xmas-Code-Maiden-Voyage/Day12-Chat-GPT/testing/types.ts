export class BoxSection {
  id: number;
  contains: string;
  originally_unknown: boolean;

  constructor(id: number, contains: string, originally_unknown: boolean) {
    this.id = id;
    this.contains = contains;
    this.originally_unknown = originally_unknown;
  }
}

export class Item {
  id: number;
  length: number;
  placement_status: string;

  constructor(id: number, length: number, placement_status: string) {
    this.id = id;
    this.length = length;
    this.placement_status = placement_status;
  }
}

export class BoxAndItemsRecord {
  box: BoxSection[];
  items: Item[];

  constructor(box: BoxSection[], items: Item[]) {
    this.box = box;
    this.items = items;
  }
}
