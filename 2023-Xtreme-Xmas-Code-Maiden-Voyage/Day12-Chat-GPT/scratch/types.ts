// SEEMS OK

export interface BoxSection {
  id: number;
  contains: string;
  originally_unknown: boolean;
}

export interface Item {
  id: number;
  length: number;
  placement_status: string;
}

export interface BoxAndItemsRecord {
  box: BoxSection[];
  items: Item[];
}

export interface Sequence {
  sections: BoxSection[];
  allEmpty: boolean;
}
