import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { snafuToDecimal, decimalToSNAFU } from "../convertSNAFU.ts";

//   Decimal          SNAFU
//         1              1
//         2              2
//         3             1=
//         4             1-
//         5             10
//         6             11
//         7             12
//         8             2=
//         9             2-
//        10             20
//        15            1=0
//        20            1-0
//      2022         1=11-2
//     12345        1-0---0
// 314159265  1121-1110-1=0
//    1=-0-2           1747
//     12111            906
//      2=0=            198
//        21             11
//      2=01            201
//       111             31
//     20012           1257
//       112             32
//     1=-1=            353
//      1-12            107
//        12              7
//        1=              3
//       122             37

Deno.test("snafuToDecimal converts 0 to 0", () => {
    const result = snafuToDecimal("0");

    assertEquals(result, 0);
});

Deno.test("snafuToDecimal converts 1 to 1", () => {
    const result = snafuToDecimal("1");

    assertEquals(result, 1);
});

Deno.test("snafuToDecimal converts 2 to 2", () => {
    const result = snafuToDecimal("2");

    assertEquals(result, 2);
});

Deno.test("snafuToDecimal converts 1= to 3", () => {
    const result = snafuToDecimal("1=");

    assertEquals(result, 3);
});

Deno.test("snafuToDecimal converts 1- to 4", () => {
    const result = snafuToDecimal("1-");

    assertEquals(result, 4);
});

Deno.test("snafuToDecimal converts 10 to 5", () => {
    const result = snafuToDecimal("10");

    assertEquals(result, 5);
});

Deno.test("snafuToDecimal converts 11 to 6", () => {
    const result = snafuToDecimal("11");

    assertEquals(result, 6);
});

Deno.test("snafuToDecimal converts 12 to 7", () => {
    const result = snafuToDecimal("12");

    assertEquals(result, 7);
});

Deno.test("snafuToDecimal converts 2= to 8", () => {
    const result = snafuToDecimal("2=");

    assertEquals(result, 8);
});

Deno.test("snafuToDecimal converts 2- to 9", () => {
    const result = snafuToDecimal("2-");

    assertEquals(result, 9);
});

Deno.test("snafuToDecimal converts 20 to 10", () => {
    const result = snafuToDecimal("20");

    assertEquals(result, 10);
});

Deno.test("snafuToDecimal converts 1=0 to 15", () => {
    const result = snafuToDecimal("1=0");

    assertEquals(result, 15);
});

Deno.test("snafuToDecimal converts 1-0 to 20", () => {
    const result = snafuToDecimal("1-0");

    assertEquals(result, 20);
});

Deno.test("snafuToDecimal converts 1=11-2 to 2022", () => {
    const result = snafuToDecimal("1=11-2");

    assertEquals(result, 2022);
});

Deno.test("snafuToDecimal converts 1-0---0 to 12345", () => {
    const result = snafuToDecimal("1-0---0");

    assertEquals(result, 12345);
});

Deno.test("snafuToDecimal converts 1121-1110-1=0 to 314159265", () => {
    const result = snafuToDecimal("1121-1110-1=0");

    assertEquals(result, 314159265);
});

Deno.test("snafuToDecimal converts 1=-0-2 to 1747", () => {
    const result = snafuToDecimal("1=-0-2");

    assertEquals(result, 1747);
});

Deno.test("snafuToDecimal converts 12111 to 906", () => {
    const result = snafuToDecimal("12111");

    assertEquals(result, 906);
});

Deno.test("snafuToDecimal converts 2=0= to 198", () => {
    const result = snafuToDecimal("2=0=");

    assertEquals(result, 198);
});

Deno.test("snafuToDecimal converts 21 to 11", () => {
    const result = snafuToDecimal("21");

    assertEquals(result, 11);
});

Deno.test("snafuToDecimal converts 2=01 to 201", () => {
    const result = snafuToDecimal("2=01");

    assertEquals(result, 201);
});

Deno.test("snafuToDecimal converts 111 to 31", () => {
    const result = snafuToDecimal("111");

    assertEquals(result, 31);
});

Deno.test("snafuToDecimal converts 20012 to 1257", () => {
    const result = snafuToDecimal("20012");

    assertEquals(result, 1257);
});

Deno.test("snafuToDecimal converts 112 to 32", () => {
    const result = snafuToDecimal("112");

    assertEquals(result, 32);
});

Deno.test("snafuToDecimal converts 1=-1= to 353", () => {
    const result = snafuToDecimal("1=-1=");

    assertEquals(result, 353);
});

Deno.test("snafuToDecimal converts 1-12 to 107", () => {
    const result = snafuToDecimal("1-12");

    assertEquals(result, 107);
});

Deno.test("snafuToDecimal converts 12 to 7", () => {
    const result = snafuToDecimal("12");

    assertEquals(result, 7);
});

Deno.test("snafuToDecimal converts 1= to 3", () => {
    const result = snafuToDecimal("1=");

    assertEquals(result, 3);
});

Deno.test("snafuToDecimal converts 122 to 37", () => {
    const result = snafuToDecimal("122");

    assertEquals(result, 37);
});

Deno.test("decimalToSNAFU converts 0 to 0", () => {
    const result = decimalToSNAFU(0);

    assertEquals(result, "0");
});

Deno.test("decimalToSNAFU converts 1 to 1", () => {
    const result = decimalToSNAFU(1);

    assertEquals(result, "1");
});

Deno.test("decimalToSNAFU converts 2 to 2", () => {
    const result = decimalToSNAFU(2);

    assertEquals(result, "2");
});

Deno.test("decimalToSNAFU converts 3 to 1=", () => {
    const result = decimalToSNAFU(3);

    assertEquals(result, "1=");
});

Deno.test("decimalToSNAFU converts 4 to 1-", () => {
    const result = decimalToSNAFU(4);

    assertEquals(result, "1-");
});

Deno.test("decimalToSNAFU converts 5 to 10", () => {
    const result = decimalToSNAFU(5);

    assertEquals(result, "10");
});

Deno.test("decimalToSNAFU converts 6 to 11", () => {
    const result = decimalToSNAFU(6);

    assertEquals(result, "11");
});

Deno.test("decimalToSNAFU converts 7 to 12", () => {
    const result = decimalToSNAFU(7);

    assertEquals(result, "12");
});

Deno.test("decimalToSNAFU converts 8 to 2=", () => {
    const result = decimalToSNAFU(8);

    assertEquals(result, "2=");
});

Deno.test("decimalToSNAFU converts 9 to 2-", () => {
    const result = decimalToSNAFU(9);

    assertEquals(result, "2-");
});

Deno.test("decimalToSNAFU converts 10 to 20", () => {
    const result = decimalToSNAFU(10);

    assertEquals(result, "20");
});

Deno.test("decimalToSNAFU converts 15 to 1=0", () => {
    const result = decimalToSNAFU(15);

    assertEquals(result, "1=0");
});

Deno.test("decimalToSNAFU converts 20 to 1-0", () => {
    const result = decimalToSNAFU(20);

    assertEquals(result, "1-0");
});

Deno.test("decimalToSNAFU converts 2022 to 1=11-2", () => {
    const result = decimalToSNAFU(2022);

    assertEquals(result, "1=11-2");
});

Deno.test("decimalToSNAFU converts 12345 to 1-0---0", () => {
    const result = decimalToSNAFU(12345);

    assertEquals(result, "1-0---0");
});

Deno.test("decimalToSNAFU converts 314159265 to 1121-1110-1=0", () => {
    const result = decimalToSNAFU(314159265);

    assertEquals(result, "1121-1110-1=0");
});

Deno.test("decimalToSNAFU converts 1747 to 1=-0-2", () => {
    const result = decimalToSNAFU(1747);

    assertEquals(result, "1=-0-2");
});

Deno.test("decimalToSNAFU converts 906 to 12111", () => {
    const result = decimalToSNAFU(906);

    assertEquals(result, "12111");
});

Deno.test("decimalToSNAFU converts 198 to 2=0=", () => {
    const result = decimalToSNAFU(198);

    assertEquals(result, "2=0=");
});

Deno.test("decimalToSNAFU converts 11 to 21", () => {
    const result = decimalToSNAFU(11);

    assertEquals(result, "21");
});

Deno.test("decimalToSNAFU converts 201 to 2=01", () => {
    const result = decimalToSNAFU(201);

    assertEquals(result, "2=01");
});

Deno.test("decimalToSNAFU converts 31 to 111", () => {
    const result = decimalToSNAFU(31);

    assertEquals(result, "111");
});

Deno.test("decimalToSNAFU converts 1257 to 20012", () => {
    const result = decimalToSNAFU(1257);

    assertEquals(result, "20012");
});

Deno.test("decimalToSNAFU converts 32 to 112", () => {
    const result = decimalToSNAFU(32);

    assertEquals(result, "112");
});

Deno.test("decimalToSNAFU converts 353 to 1=-1=", () => {
    const result = decimalToSNAFU(353);

    assertEquals(result, "1=-1=");
});

Deno.test("decimalToSNAFU converts 107 to 1-12", () => {
    const result = decimalToSNAFU(107);

    assertEquals(result, "1-12");
});

Deno.test("decimalToSNAFU converts 7 to 12", () => {
    const result = decimalToSNAFU(7);

    assertEquals(result, "12");
});

Deno.test("decimalToSNAFU converts 3 to 1=", () => {
    const result = decimalToSNAFU(3);

    assertEquals(result, "1=");
});

Deno.test("decimalToSNAFU converts 37 to 122", () => {
    const result = decimalToSNAFU(37);

    assertEquals(result, "122");
});
