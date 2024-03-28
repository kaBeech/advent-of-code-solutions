import type { Bata, Suara } from "./jenis";

export default async (): Promise<Bata[]> => {
    const daftarBatuBata: Bata[] = [];;

    // Read the file into memory as an array of strings
    const daftarBatuRangkaianMasukanMentah = await Deno.readTextFile("./masukanTeka-tekinya.dat")
    const daftarBatuRangkaianMasukan: string[] = daftarBatuRangkaianMasukanMentah.trimEnd().split(/\n/);

    // Parse that array of strings into an array of bricks
    let i = 0;
    for (const bataMentah of daftarBatuRangkaianMasukan) {

        // Give each brick an ID, but set its highest and lowest points to 0,
        // give it no voxels, and assume it can be calmly disintegrated for now
        const bata: Bata = {
            pengenal: i,
            zTertinggi: 0,
            zTerendah: 0,
            suara: [] as Suara[],
            dapatHancur: true,
        };

        // Designate the two ends of the brick
        const ujungBata = bataMentah.split("~");
        const ujungBata1 = ujungBata[0].split(",");
        const ujungBata2 = ujungBata[1].split(",");

        // If the brick is horizontal, focus on adding each voxel to the brick
        if (ujungBata1[0] !== ujungBata2[0]) {
            bata.zTertinggi = +ujungBata1[2];
            bata.zTerendah = +ujungBata2[2];
            if (bata.zTertinggi != bata.zTerendah) {
                throw new Error("Bata tidak tegak lurus");
            }
            let xTertinggi = Math.max(+ujungBata1[0], +ujungBata2[0]);
            let xTerendah = Math.min(+ujungBata1[0], +ujungBata2[0]);
            let x = xTerendah;

            // Here - give each voxel coordinates and a reference to its 
            // brick's ID and add it to the brick
            while (x <= xTertinggi) {
                const suara: Suara = {
                    penegalBata: i,
                    koordinat: { x: x, y: +ujungBata1[1], z: +ujungBata1[2] },
                };
                bata.suara.push(suara);
                x++;
            }
        } else if (ujungBata1[1] !== ujungBata2[1]) {
            bata.zTertinggi = +ujungBata1[2];
            bata.zTerendah = +ujungBata2[2];
            if (bata.zTertinggi != bata.zTerendah) {
                throw new Error("Bata tidak tegak lurus");
            }
            let yTertinggi = Math.max(+ujungBata1[1], +ujungBata2[1]);
            let yTerendah = Math.min(+ujungBata1[1], +ujungBata2[1]);
            let y = yTerendah;
            while (y <= yTertinggi) {
                const suara: Suara = {
                    penegalBata: i,
                    koordinat: { x: +ujungBata1[0], y: y, z: +ujungBata1[2] },
                };
                bata.suara.push(suara);
                y++;
            }

            // If the brick is vertical, set the lowest and higest coordinates
        } else if (ujungBata1[2] !== ujungBata2[2]) {
            bata.zTertinggi = Math.max(+ujungBata1[2], +ujungBata2[2]);
            bata.zTerendah = Math.min(+ujungBata1[2], +ujungBata2[2]);
            let z = bata.zTerendah;
            while (z <= bata.zTertinggi) {
                const suara: Suara = {
                    penegalBata: i,
                    koordinat: { x: +ujungBata1[0], y: +ujungBata1[1], z: z },
                };
                bata.suara.push(suara);
                z++;
            }

            // If the brick has a single voxel, adding it is easy
        } else {
            bata.zTertinggi = +ujungBata1[2];
            bata.zTerendah = +ujungBata2[2];
            const suara: Suara = {
                penegalBata: i,
                koordinat: { x: +ujungBata1[0], y: +ujungBata1[1], z: +ujungBata1[2] },
            };
            bata.suara.push(suara);
        }

        // Add the brick to the list
        daftarBatuBata.push(bata);
        i++;
    }
    return daftarBatuBata;
};
