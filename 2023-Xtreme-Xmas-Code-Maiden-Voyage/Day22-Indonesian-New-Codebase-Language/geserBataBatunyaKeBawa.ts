import geserBata from "./geserBata.ts";
import hitungBatuBataDiBawahnya from "./hitungBatuBataDiBawahnya.ts";
import type { Bata } from "./jenis.ts";

export default (daftarBatuBata: Bata[]): Bata[] => {
    const daftarBatuBataYangDiurutkan = daftarBatuBata.sort((a, b) => {
        return a.zTerendah - b.zTerendah;
    });

    for (const bata of daftarBatuBataYangDiurutkan) {
        if (bata.zTertinggi !== bata.zTerendah) {
            let suaraBataTerendah = bata.suara.find((suara) => suara.koordinat.z === bata.zTerendah)!;
            while (hitungBatuBataDiBawahnya(daftarBatuBataYangDiurutkan, suaraBataTerendah).length === 0) {
                geserBata(bata, -1)
            }
        } else if (bata.zTerendah > 1) {
            let dapatGeser = true;
            while (dapatGeser) {
                for (const suara of bata.suara) {
                    if (hitungBatuBataDiBawahnya(daftarBatuBataYangDiurutkan, suara).length > 0) {
                        dapatGeser = false
                    }
                }
                if (dapatGeser) {
                    geserBata(bata, -1);
                }
            }
        }
    }

    for (const batu of daftarBatuBataYangDiurutkan) {
        console.log(JSON.stringify(batu));
    }
    return daftarBatuBataYangDiurutkan;
};
