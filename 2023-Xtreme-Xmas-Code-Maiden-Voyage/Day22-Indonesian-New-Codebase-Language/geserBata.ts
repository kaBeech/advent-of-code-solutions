import type { Bata } from "./jenis"

export default (bata: Bata, daftarBatuBata: Bata[]) => {
    // console.log(JSON.stringify(daftarBatuBata))
    // console.log(JSON.stringify(bata))
    let dapatGeser = true
    const batuBataRendah = daftarBatuBata.filter((bata2) => bata2.zTertinggi === bata.zTerendah - 1)
    // const batuBataRendah = daftarBatuBata
    let distance = 0
    for (const suara of bata.suara) {
        for (const bataRendah of batuBataRendah) {
            for (const suara2 of bataRendah.suara) {
                // if (suara.koordinat.x === suara2.koordinat.x && suara.koordinat.y === suara2.koordinat.y && suara.koordinat.z === suara2.koordinat.z) {
                if (suara.koordinat.x === suara2.koordinat.x && suara.koordinat.y === suara2.koordinat.y) {
                    dapatGeser = false
                }
            }
        }
    }
    if (bata.zTerendah === 1) {
        dapatGeser = false
    }
    if (dapatGeser) {
        for (const suara of bata.suara) {
            suara.koordinat.z -= 1
        }
        bata.zTertinggi -= 1
        bata.zTerendah -= 1
        distance += 1
        // console.log(JSON.stringify(bata))
    }
    return { bata, distance }
}
