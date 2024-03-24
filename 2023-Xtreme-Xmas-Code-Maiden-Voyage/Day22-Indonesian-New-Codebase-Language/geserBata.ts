import type { Bata } from "./jenis"

export default (bata: Bata, jumlah: number) => {
    // console.log(JSON.stringify(bata))
    for (const suara of bata.suara) {
        suara.koordinat.z += jumlah
    }
    bata.zTertinggi += jumlah
    bata.zTerendah += jumlah
    // console.log(JSON.stringify(bata))
    return bata
}
