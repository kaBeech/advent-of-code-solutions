import geserBata from "./geserBata.ts";
import hitungBatuBataDiBawahnya from "./hitungBatuBataDiBawahnya.ts";
import type { Bata } from "./jenis.ts";

export default (daftarBatuBata: Bata[]): { daftarBatuBataYangDiurutkan: Bata[], batuBataYangTelahDigeser: number } => {
    const daftarBatuBataYangDiurutkan = daftarBatuBata.sort((a, b) => {
        return a.zTerendah - b.zTerendah;
    });

    // Bricks that have been shifted by ID
    const batuBataYangTelahDigeser: number[] = []

    let finishedShifting = false
    while (!finishedShifting) {
        finishedShifting = true
        for (const bata of daftarBatuBataYangDiurutkan) {
            const result = geserBata(bata, daftarBatuBataYangDiurutkan)
            if (result.distance > 0) {
                if (batuBataYangTelahDigeser.indexOf(bata.pengenal) === -1) {
                    batuBataYangTelahDigeser.push(bata.pengenal)
                }
                finishedShifting = false
            }
        }
    }

    return { daftarBatuBataYangDiurutkan, batuBataYangTelahDigeser: batuBataYangTelahDigeser.length }
};
