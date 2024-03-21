import uraikanMasukan from './uraikanMasukan';
import type { Bata } from './jenis';
export default (async function(): Promise<number> {
    const daftarBatuBata: Bata[] = await uraikanMasukan();

    const jumlahBatuBataYangDapatHancur = hitungBatuBataYangBisaDihancurkan(daftarBatuBata);

    console.log(`Bagian Satu: ${JSON.stringify(jumlahBatuBataYangDapatHancur)} batu bata mungkin hancur`);

    return jumlahBatuBataYangDapatHancur;
})();
