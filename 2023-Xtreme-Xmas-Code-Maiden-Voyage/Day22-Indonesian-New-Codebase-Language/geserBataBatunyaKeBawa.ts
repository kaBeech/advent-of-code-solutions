import geserBata from "./geserBata.ts";
import type { Bata } from "./jenis.ts";
import periksaBataDapatGeser from "./periksaBataDapatGeser.ts";

export default (daftarBatuBata: Bata[]): Bata[] => {
    const daftarBatuBataYangDiurutkan = daftarBatuBata.sort((a, b) => {
        return a.zTerendah - b.zTerendah;
    });

    for (const bata of daftarBatuBataYangDiurutkan) {
        if (bata.zTertinggi !== bata.zTerendah) {
            let suaraBataTerendah = bata.suara.find((suara) => suara.koordinat.z === bata.zTerendah)!;
            while (!periksaBataDapatGeser(daftarBatuBataYangDiurutkan, suaraBataTerendah)) {
                geserBata(bata, -1)
            }
        } else {
            let dapatGeser = true;
            while (dapatGeser) {
                for (const suara of bata.suara) {
                    if (periksaBataDapatGeser(daftarBatuBataYangDiurutkan, suara)) {
                        dapatGeser = false
                    }
                }
            }
            if (dapatGeser) {
                geserBata(bata, -1);
            }
        }
    }

    console.log(`Bagian Satu: ${JSON.stringify(daftarBatuBataYangDiurutkan)} batu bata mungkin hancur`);
    return daftarBatuBataYangDiurutkan;
};
