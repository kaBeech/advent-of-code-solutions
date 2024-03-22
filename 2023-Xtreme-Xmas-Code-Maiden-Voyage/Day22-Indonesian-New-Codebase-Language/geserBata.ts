import type { Bata } from "./jenis"

export default (bata: Bata, jumlah: number) => {
    for (const suara of bata.suara) {
        suara.koordinat.z += jumlah
    }
    bata.zTertinggi += jumlah
    bata.zTerendah -= jumlah
    return bata
}
