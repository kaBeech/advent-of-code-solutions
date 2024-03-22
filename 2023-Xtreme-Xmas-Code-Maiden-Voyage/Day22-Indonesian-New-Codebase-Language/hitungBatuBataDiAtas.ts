import type { Bata, Suara } from "./jenis.ts"

export default (daftarBatuBata: Bata[], suara: Suara) => {
    return daftarBatuBata.find((bataTinggi) => bataTinggi.zTerendah === suara.koordinat.z + 1 && bataTinggi.suara.find((suaraTinggi) => suaraTinggi.koordinat.x === suara.koordinat.x && suaraTinggi.koordinat.y === suara.koordinat.y))
}
