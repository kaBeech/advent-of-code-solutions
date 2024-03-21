import type { Bata } from "./jenis";

export default (daftarBatuBata: Bata[]): Bata[] => {
    const daftarBatuBataYangDiurutkan = daftarBatuBata.sort((a, b) => {
        return a.zTerendah - b.zTerendah;
    });

    for (const bata of daftarBatuBataYangDiurutkan) {
        // Check if all the voxels have empty space beneath them. If so, shift them down. Recursively do this until a voxel has a non-empty space beneath it.
    }

    // console.log(`Bagian Satu: ${JSON.stringify(daftarBatuBataYangDiurutkan)} batu bata mungkin hancur`);
    return daftarBatuBataYangDiurutkan;
};
