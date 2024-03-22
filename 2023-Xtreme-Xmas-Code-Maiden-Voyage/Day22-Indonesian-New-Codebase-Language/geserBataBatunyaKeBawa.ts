import geserBata from "./geserBata.ts";
import hitungBatuBataDiBawahnya from "./hitungBatuBataDiBawahnya.ts";
import type { Bata } from "./jenis.ts";

export default (daftarBatuBata: Bata[]): Bata[] => {
    const daftarBatuBataYangDiurutkan = daftarBatuBata.sort((a, b) => {
        return a.zTerendah - b.zTerendah;
    });
    for (const batu of daftarBatuBataYangDiurutkan) {
        if (batu.zTerendah < 20) {
            console.log(JSON.stringify(batu));
        }
    }
    for (const bata of daftarBatuBataYangDiurutkan) {
        // I think,we could just remove this first whole if block, and start with the 'if' after else a few words down. hitungBatuBataDiBawahnya won't mis-identify bricks as being below themselves, even vertically-standing bricks
        // console.count("TESTTTTTTTTTTTTT")
        if (bata.zTertinggi !== bata.zTerendah && bata.zTerendah > 1) {
            let suaraBataTerendah = bata.suara.find((suara) => suara.koordinat.z === bata.zTerendah)!;
            while (!hitungBatuBataDiBawahnya(daftarBatuBataYangDiurutkan, suaraBataTerendah) && bata.zTerendah > 1) {
                geserBata(bata, -1)
            }
        } else if (bata.zTerendah > 1) {
            let dapatGeser = true;
            while (dapatGeser && bata.zTerendah > 1) {
                // console.count(bata.zTerendah.toString())
                for (const suara of bata.suara) {
                    if (hitungBatuBataDiBawahnya(daftarBatuBataYangDiurutkan, suara)) {
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
        if (batu.zTerendah < 20) {
            console.log(JSON.stringify(batu));
        }
    }
    return daftarBatuBataYangDiurutkan;
};
