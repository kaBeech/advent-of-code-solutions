import geserBataBatunyaKeBawa from './geserBataBatunyaKeBawa.ts';
import hitungBatuBataYangBisaDihancurkan from './hitungBatuBataYangBisaDihancurkan.ts';
import type { Bata } from './jenis.ts';
import uraikanMasukan from './uraikanMasukan.ts';

export default (async function(): Promise<number> {
    const daftarBatuBata: Bata[] = await uraikanMasukan()

    const daftarBatuBataYangDiurutkan = geserBataBatunyaKeBawa(daftarBatuBata).daftarBatuBataYangDiurutkan

    const jumlahBatuBataYangDapatHancur = hitungBatuBataYangBisaDihancurkan(daftarBatuBataYangDiurutkan);

    console.log(`Bagian Satu: ${JSON.stringify(jumlahBatuBataYangDapatHancur)} batu bata mungkin hancur`);

    return jumlahBatuBataYangDapatHancur;
})();
