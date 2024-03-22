import hitungBatuBataDiBawahnya from "./hitungBatuBataDiBawahnya";
import type { Bata } from "./jenis";

export default (daftarBatuBata: Bata[]): number => {
    let jumlahBatuBataYangDapatHancur = 0

    for (const bata of daftarBatuBata) {
        const batuBataDiBawahnya = [] as Bata[]
        for (const suara of bata.suara) {
            const bataRendah = hitungBatuBataDiBawahnya(daftarBatuBata, suara)
            if (bataRendah) { batuBataDiBawahnya.push(bataRendah) }
        }
        if (batuBataDiBawahnya.length > 1) {
            for (const bataRendah of batuBataDiBawahnya) {
                bataRendah.dapatHancur = true
            }
        }
    }

    for (const bata of daftarBatuBata) {
        if (bata.dapatHancur) { jumlahBatuBataYangDapatHancur++ }
    }

    return jumlahBatuBataYangDapatHancur;
};
