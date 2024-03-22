import hitungBatuBataDiAtas from "./hitungBatuBataDiAtas.ts";
import hitungBatuBataDiBawahnya from "./hitungBatuBataDiBawahnya.ts";
import type { Bata } from "./jenis";

export default (daftarBatuBata: Bata[]): number => {
    let jumlahBatuBataYangDapatHancur = 0

    for (const bata of daftarBatuBata) {
        const batuBataDiBawahnya = [] as Bata[]
        // const batuBataDiAtas = [] as Bata[]
        for (const suara of bata.suara) {
            const bataRendah = hitungBatuBataDiBawahnya(daftarBatuBata, suara)
            if (bataRendah) { batuBataDiBawahnya.push(bataRendah) }
            // const bataTinggi = hitungBatuBataDiAtas(daftarBatuBata, suara)
            // if (bataTinggi) { batuBataDiAtas.push(bataTinggi) }
        }
        if (batuBataDiBawahnya.length === 1) {
            batuBataDiBawahnya[0].dapatHancur = false
            // for (const bataRendah of batuBataDiBawahnya) {
            // bataRendah.dapatHancur = false
            // }
        }
        // if (batuBataDiAtas.length === 0) {
        // bata.dapatHancur = true
        // console.count("143")
        // }
    }

    for (const bata of daftarBatuBata) {
        if (bata.dapatHancur) { jumlahBatuBataYangDapatHancur++ }
    }

    for (const bata of daftarBatuBata) {
        console.log(JSON.stringify(bata))
    }

    return jumlahBatuBataYangDapatHancur;
};
