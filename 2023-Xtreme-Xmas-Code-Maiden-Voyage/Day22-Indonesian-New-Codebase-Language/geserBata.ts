import type { Bata } from "./jenis"

export default (bata: Bata, daftarBatuBata: Bata[]) => {
    // console.log(bata.zTerendah)

    // Assume the brick can be moved
    let dapatGeser = true

    // Assume the brick hasn't moved
    let jarak = 0

    // Get all bricks that could be 1 lower than the current brick
    const batuBataRendah = daftarBatuBata.filter((bata2) => bata2.zTertinggi === bata.zTerendah - 1)
    // const batuBataRendah = daftarBatuBata.filter((bata2) => bata2.zTertinggi < bata.zTerendah + 10 && bata2.zTertinggi >= bata.zTerendah - 10)
    // const batuBataRendah = daftarBatuBata.filter((bata2) => bata2.zTerendah < bata.zTertinggi)
    // const batuBataRendah = daftarBatuBata

    // For every voxel in the current brick, check if there is a voxel 1 below 
    // it in any brick. If there is, don't move the brick
    for (const bataRendah of batuBataRendah) {
        for (const suara of bata.suara) {
            for (const suara2 of bataRendah.suara) {
                if (suara.koordinat.x === suara2.koordinat.x && suara.koordinat.y === suara2.koordinat.y && suara.koordinat.z - 1 === suara2.koordinat.z) {
                    // if (suara.koordinat.x === suara2.koordinat.x && suara.koordinat.y === suara2.koordinat.y) {
                    dapatGeser = false
                }
            }
        }
    }

    // If the brick is on the ground, don't move it
    if (bata.zTerendah === 1) {
        dapatGeser = false
    }

    // If the brick can be moved, move it
    if (dapatGeser) {
        for (const suara of bata.suara) {
            suara.koordinat.z -= 1
        }
        bata.zTertinggi -= 1
        bata.zTerendah -= 1
        jarak += 1
        // console.log(JSON.stringify(bata))
    }

    // Return the brick and the distance it can be moved
    return { bata, jarak }
}
