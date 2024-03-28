import geserBata from "./geserBata.ts";
import type { Bata } from "./jenis.ts";

export default (daftarBatuBata: Bata[]): { daftarBatuBataYangDiurutkan: Bata[], batuBataYangTelahDigeser: number } => {

    // Sort the bricks from lowest to highest Lowest Z Coordinate values
    const daftarBatuBataYangDiurutkan = daftarBatuBata.sort((a, b) => {
        return a.zTerendah - b.zTerendah;
    });

    console.log(daftarBatuBataYangDiurutkan[0].zTerendah, " ", daftarBatuBataYangDiurutkan[daftarBatuBataYangDiurutkan.length - 1].zTerendah, " ", daftarBatuBataYangDiurutkan.length)


    // Make a list of bricks that have been shifted 
    const batuBataYangTelahDigeserBerdasarkanId: number[] = []

    // Continue the cycle of shifting bricks until a cycle has passed when no 
    // bricks have been shifted
    let selesaiGeser = false
    while (!selesaiGeser) {
        selesaiGeser = true

        // Try to shift each brick
        for (const bata of daftarBatuBataYangDiurutkan) {

            // // Create a list of bricks that don't include the current brick
            // const daftarBatuBata2 = daftarBatuBataYangDiurutkan.filter((bata2) => bata2.pengenal !== bata.pengenal)
            //
            // // Throw an error if the current brick is in the new list of bricks
            // if (daftarBatuBata2.find((bata2) => bata2.pengenal === bata.pengenal)) {
            //     throw new Error("?!")
            // }

            const hasil = geserBata(bata, daftarBatuBataYangDiurutkan)
            // const hasil = geserBata(bata, daftarBatuBata2)

            // If the brick has moved, add it to the list of shifted bricks 
            // and indicate that shifting is to continue
            if (hasil.jarak > 0) {
                if (batuBataYangTelahDigeserBerdasarkanId.indexOf(bata.pengenal) === -1) {
                    batuBataYangTelahDigeserBerdasarkanId.push(bata.pengenal)
                }
                selesaiGeser = false
            }
        }
    }

    return { daftarBatuBataYangDiurutkan, batuBataYangTelahDigeser: batuBataYangTelahDigeserBerdasarkanId.length }
};
