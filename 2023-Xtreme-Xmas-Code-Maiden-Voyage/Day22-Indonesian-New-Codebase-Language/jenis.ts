export interface XYZKoordinat {
    x: number;
    y: number;
    z: number;
}

export interface Suara {
    bata: number;
    koordinat: XYZKoordinat;
}

export interface Bata {
    pengenal: number;
    suara: Suara[];
}
