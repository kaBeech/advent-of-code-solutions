import type { Bata, Suara } from "./jenis";

export default async (): Promise<Bata[]> => {
    const daftarBatuBata: Bata[] = [];;
    const daftarBatuRangkaianMasukanMentah = await Deno.readTextFile("./masukanPengujian.dat")
    const daftarBatuRangkaianMasukan: string[] = daftarBatuRangkaianMasukanMentah.trimEnd().split(/\n/);
    let i = 0;
    for (const bataMentah of daftarBatuRangkaianMasukan) {
        const bata: Bata = {
            pengenal: i,
            suara: [] as Suara[],
        }
        daftarBatuBata.push(bata);
    }
    return daftarBatuBata;
};
