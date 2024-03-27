import geserBata from "./geserBata.ts";
import hitungBatuBataDiBawahnya from "./hitungBatuBataDiBawahnya.ts";
import type { Bata } from "./jenis.ts";

export default (daftarBatuBata: Bata[]): { daftarBatuBataYangDiurutkan: Bata[], batuBataYangTelahDigeser: number } => {
    const daftarBatuBataYangDiurutkan = daftarBatuBata.sort((a, b) => {
        return a.zTerendah - b.zTerendah;
    });

    let batuBataYangTelahDigeser = 0
    let path = ""

    for (const batu of daftarBatuBataYangDiurutkan) {
        if (batu.zTerendah < 20) {
            // console.log(JSON.stringify(batu));
        }
    }
    for (const bata of daftarBatuBataYangDiurutkan) {
        // I think we could just remove this first whole if block, and start with the 'if' after else a few lines down. hitungBatuBataDiBawahnya won't mis-identify bricks as being below themselves, even vertically-standing bricks
        if (bata.zTertinggi !== bata.zTerendah && bata.zTerendah > 1) {
            let suaraBataTerendah = bata.suara.find((suara) => suara.koordinat.z === bata.zTerendah)!;
            let bataTelahBergeser = false
            while (!hitungBatuBataDiBawahnya(daftarBatuBataYangDiurutkan, suaraBataTerendah) && bata.zTerendah > 1) {
                geserBata(bata, -1)
                if (!bataTelahBergeser) {
                    bataTelahBergeser = true
                    batuBataYangTelahDigeser++
                    path += "a"
                }
            }
        } else if (bata.zTerendah > 1) {
            path += "1"
            let dapatGeser = true;
            let bataTelahBergeser = false;
            while (dapatGeser && bata.zTerendah > 1) {
                // console.count(bata.zTerendah.toString())
                for (const suara of bata.suara) {
                    if (hitungBatuBataDiBawahnya(daftarBatuBataYangDiurutkan, suara)) {
                        path += "2"
                        dapatGeser = false
                    }
                }
                if (dapatGeser) {
                    if (!bataTelahBergeser) {
                        path += "b"
                        bataTelahBergeser = true
                        batuBataYangTelahDigeser++
                    }
                    geserBata(bata, -1);
                }
            }
        } else if (bata.zTerendah <= 1) {
            path += "y"
            // console.count("z")
            // console.log(JSON.stringify(bata.suara))
        } else {
            path += "z"
        }
    }

    for (const batu of daftarBatuBataYangDiurutkan) {
        if (batu.zTerendah < 20) {
            // console.log(JSON.stringify(batu));
        }
    }

    // if (batuBataYangTelahDigeser === 0) console.log(batuBataYangTelahDigeser, " ", path)
    return { daftarBatuBataYangDiurutkan, batuBataYangTelahDigeser }
};
