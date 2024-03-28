import geserBataBatunyaKeBawa from "./geserBataBatunyaKeBawa.ts";
import hitungBatuBataDiAtas from "./hitungBatuBataDiAtas.ts";
import hitungBatuBataDiBawahnya from "./hitungBatuBataDiBawahnya.ts";
import type { Bata } from "./jenis";

export default (daftarBatuBata: Bata[]) => {
    let jumlahBatuBataYangDapatHancurDenganTenang = 0

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
        } else if (batuBataDiBawahnya.length > 1 && batuBataDiBawahnya.every((batu) => batu.pengenal === batuBataDiBawahnya[0].pengenal)) {
            batuBataDiBawahnya[0].dapatHancur = false
            // console.log(batuBataDiBawahnya)
        }

    }
    // if (batuBataDiAtas.length === 0) {
    // bata.dapatHancur = true
    // console.count("143")
    // }
    // }

    let jumlahBatuBataYangAkanGeser = 0

    for (const bata of daftarBatuBata) {
        if (bata.dapatHancur) {
            jumlahBatuBataYangDapatHancurDenganTenang++
        } else {
            const daftarBatuBata2 = daftarBatuBata.filter((bata2) => bata2.pengenal !== bata.pengenal)
            if (daftarBatuBata2.find((bata2) => bata2.pengenal === bata.pengenal)) {
                throw new Error("What?")
            }
            // console.log(232, JSON.stringify(daftarBatuBata2))
            // Here's the issue. For some reason, geserBataBatunyaKeBawa is returning 0 bricks shifted when it is called here sometimes. This part of the code should not be reached if disintegrating a brick would result in 0 brick shifts.
            // The number of safely disintegratable bricks is coming back as correct, so that leads me to believe that geserBataBatunyaKeBawa is returning an inaccurate count of brick shifts.
            let count = geserBataBatunyaKeBawa(daftarBatuBata2).batuBataYangTelahDigeser;
            // if (count === 0) { console.log("0 ", JSON.stringify(bata)) }
            jumlahBatuBataYangAkanGeser += count
        }
    }

    console.log(jumlahBatuBataYangAkanGeser)

    for (const bata of daftarBatuBata) {
        // console.log(JSON.stringify(bata))
    }

    return { jumlahBatuBataYangDapatHancurDenganTenang, jumlahBatuBataYangAkanGeser };
};
