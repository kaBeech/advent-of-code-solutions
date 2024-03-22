import type { Bata, Suara } from "./jenis.ts"

export default (daftarBatuBata: Bata[], suara: Suara) => {
    if (daftarBatuBata.find((bataRendah) => bataRendah.zTertinggi === suara.koordinat.z - 1 && bataRendah.suara.find((suaraRendah) => suaraRendah.koordinat.x === suara.koordinat.x && suaraRendah.koordinat.y === suara.koordinat.y))) {
        return true
    } else return false
}
