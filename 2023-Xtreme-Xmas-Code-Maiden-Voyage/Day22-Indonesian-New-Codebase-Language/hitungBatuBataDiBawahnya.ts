import type { Bata, Suara } from "./jenis.ts"

export default (daftarBatuBata: Bata[], suara: Suara) => {

    // If there is a brick with a voxel 1 below the current voxel, return that 
    // brick
    for (const bata of daftarBatuBata) {
        // if (bata.zTertinggi === suara.koordinat.z - 1) {
        if (bata.pengenal !== suara.penegalBata) {
            for (const suara2 of bata.suara) {
                if (suara2.koordinat.x === suara.koordinat.x && suara2.koordinat.y === suara.koordinat.y && suara2.koordinat.z === suara.koordinat.z - 1) {
                    return bata
                }
            }
        }
    }

    // Otherwise, return null
    return null
}
