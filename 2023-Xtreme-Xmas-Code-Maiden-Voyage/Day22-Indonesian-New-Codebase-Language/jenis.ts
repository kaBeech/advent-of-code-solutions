export interface XYZKoordinat {
    x: number;
    y: number;
    z: number;
}

export interface Suara {
    penegalBata: number;
    koordinat: XYZKoordinat;
}

export interface Bata {
    pengenal: number;
    zTertinggi: number;
    zTerendah: number;
    suara: Suara[];
    dapatHancur: boolean;
}
