import type { Bata, Suara } from "./jenis";

export default async (): Promise<Bata[]> => {
    const daftarBatuBata: Bata[] = [];;
    const daftarBatuRangkaianMasukanMentah = await Deno.readTextFile("./masukanPengujian.dat")
    const daftarBatuRangkaianMasukan: string[] = daftarBatuRangkaianMasukanMentah.trimEnd().split(/\n/);
    let i = 0;
    for (const bataMentah of daftarBatuRangkaianMasukan) {
        const bata: Bata = {
            pengenal: i,
            zTertinggi: 0,
            zTerendah: 0,
            suara: [] as Suara[],
            dapatHancur: false,
        };
        const ujungBata = bataMentah.split("~");
        const ujungBata1 = ujungBata[0].split(",");
        const ujungBata2 = ujungBata[1].split(",");
        if (ujungBata1[0] !== ujungBata2[0]) {
            bata.zTertinggi = +ujungBata1[2];
            bata.zTerendah = +ujungBata2[2];
            if (bata.zTertinggi != bata.zTerendah) {
                throw new Error("Bata tidak tegak lurus");
            }
            let xTertinggi = Math.max(+ujungBata1[0], +ujungBata2[0]);
            let xTerendah = Math.min(+ujungBata1[0], +ujungBata2[0]);
            let x = xTerendah;
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
        } else {
            bata.zTertinggi = +ujungBata1[2];
            bata.zTerendah = +ujungBata2[2];
            const suara: Suara = {
                penegalBata: i,
                koordinat: { x: +ujungBata1[0], y: +ujungBata1[1], z: +ujungBata1[2] },
            };
            bata.suara.push(suara);
        }
        // console.log(bata);
        daftarBatuBata.push(bata);
        i++;
    }
    return daftarBatuBata;
};
