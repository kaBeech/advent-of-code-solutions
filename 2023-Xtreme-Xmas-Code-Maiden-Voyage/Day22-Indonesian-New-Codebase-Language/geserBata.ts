import type { Bata } from "./jenis"

export default (bata: Bata, daftarBatuBata: Bata[]) => {

    // Assume the brick can be moved
    let dapatGeser = true

    // Assume the brick has not moved
    let jarak = 0

    // Get all bricks that could be one level below the current brick
    const batuBataRendah = daftarBatuBata.filter((bata2) => bata2.zTertinggi === bata.zTerendah - 1)
    // const batuBataRendah = daftarBatuBata

    // For each of the brick's voxels, check if there is a voxel in a brick 
    // below it
    for (const suara of bata.suara) {
        for (const bataRendah of batuBataRendah) {
            for (const suara2 of bataRendah.suara) {
                // if (suara.koordinat.x === suara2.koordinat.x && suara.koordinat.y === suara2.koordinat.y && suara.koordinat.z - 1 === suara2.koordinat.z) {
                if (suara.koordinat.x === suara2.koordinat.x && suara.koordinat.y === suara2.koordinat.y) {
                    dapatGeser = false
                }
            }
        }
    }

    // If the brick is already on the ground, don't move it
    if (bata.zTerendah === 1) {
        dapatGeser = false
    }

    // If the brick can be moved, move it down by 1
    if (dapatGeser) {
        for (const suara of bata.suara) {
            suara.koordinat.z -= 1
        }
        bata.zTertinggi -= 1
        bata.zTerendah -= 1
        jarak += 1
        // console.log(JSON.stringify(bata))
    }

    // Return the brick and the distance it has moved
    return { bata, jarak }
}
