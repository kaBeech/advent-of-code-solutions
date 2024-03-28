import geserBataBatunyaKeBawa from './geserBataBatunyaKeBawa.ts';
import hitungBatuBataYangBisaDihancurkan from './hitungBatuBataYangBisaDihancurkan.ts';
import type { Bata } from './jenis.ts';
import uraikanMasukan from './uraikanMasukan.ts';

export default (async function(): Promise<{ jumlahBatuBataYangDapatHancurDenganTenang: number, jumlahBatuBataYangAkanGeser: number }> {
    const daftarBatuBata: Bata[] = await uraikanMasukan()

    const daftarBatuBataYangDiurutkan = geserBataBatunyaKeBawa(daftarBatuBata).daftarBatuBataYangDiurutkan

    const hasil = hitungBatuBataYangBisaDihancurkan(daftarBatuBataYangDiurutkan);

    console.log(`Bagian Satu: ${JSON.stringify(hasil.jumlahBatuBataYangDapatHancurDenganTenang)} batu bata mungkin hancur dengan tenang`);

    console.log(`Bagian Dua: ${JSON.stringify(hasil.jumlahBatuBataYangAkanGeser)} batu bata harus digeser`);

    return hasil;
})();
