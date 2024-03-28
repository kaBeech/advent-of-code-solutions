import type { Bata, Suara } from "./jenis.ts"

export default (daftarBatuBata: Bata[], suara: Suara) => {
    for (const brick of daftarBatuBata) {
        if (brick.zTertinggi === suara.koordinat.z - 1) {
            for (const voxel of brick.suara) {
                if (voxel.koordinat.x === suara.koordinat.x && voxel.koordinat.y === suara.koordinat.y) {
                    return brick
                }
            }
        }
    }
    return null
}
