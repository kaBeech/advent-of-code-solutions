import geserBata from "./geserBata.ts";
import type { Bata } from "./jenis.ts";

export default (daftarBatuBata: Bata[]): { daftarBatuBataYangDiurutkan: Bata[], batuBataYangTelahDigeser: number } => {

    // Sort the bricks from lowest to highest Lowest Z Coordinate values
    const daftarBatuBataYangDiurutkan = daftarBatuBata.sort((a, b) => {
        return a.zTerendah - b.zTerendah;
    });

    // Make a list of bricks that have been shifted 
    const batuBataYangTelahDigeserBerdasarkanId: number[] = []

    // Continue the cycle of shifting bricks until a cycle has passed when no 
    // bricks have been shifted
    let selesaiGeser = false
    while (!selesaiGeser) {
        selesaiGeser = true

        // Try to shift each brick
        for (const bata of daftarBatuBataYangDiurutkan) {
            const hasil = geserBata(bata, daftarBatuBataYangDiurutkan)

            // If the brick has moved, add it to the list of shifted bricks 
            // and indicate that shifting is to continue
            if (hasil.distance > 0) {
                if (batuBataYangTelahDigeserBerdasarkanId.indexOf(bata.pengenal) === -1) {
                    batuBataYangTelahDigeserBerdasarkanId.push(bata.pengenal)
                }
                selesaiGeser = false
            }
        }
    }

    return { daftarBatuBataYangDiurutkan, batuBataYangTelahDigeser: batuBataYangTelahDigeserBerdasarkanId.length }
};
