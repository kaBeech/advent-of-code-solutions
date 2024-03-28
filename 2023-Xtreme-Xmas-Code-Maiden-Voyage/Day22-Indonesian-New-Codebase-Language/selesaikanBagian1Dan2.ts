import uraikanMasukan from './uraikanMasukan.ts';
import geserBataBatunyaKeBawa from './geserBataBatunyaKeBawa.ts';
import hitungBatuBataYangBisaDihancurkan from './hitungBatuBataYangBisaDihancurkan.ts';
import type { Bata } from './jenis.ts';

export default (async function(): Promise<{ jumlahBatuBataYangDapatHancurDenganTenang: number, jumlahBatuBataYangAkanGeser: number }> {

    // Get the list of bricks
    const daftarBatuBata: Bata[] = await uraikanMasukan()

    // Compress the bricks
    const daftarBatuBataYangDiurutkan = geserBataBatunyaKeBawa(daftarBatuBata).daftarBatuBataYangDiurutkan

    // Assess the bricks' disintegration properties
    const hasil = hitungBatuBataYangBisaDihancurkan(daftarBatuBataYangDiurutkan);

    // Report the results
    console.log(`Bagian Satu: ${JSON.stringify(hasil.jumlahBatuBataYangDapatHancurDenganTenang)} batu bata mungkin hancur dengan tenang`);

    console.log(`Bagian Dua: ${JSON.stringify(hasil.jumlahBatuBataYangAkanGeser)} batu bata harus digeser`);

    return hasil;
})();
