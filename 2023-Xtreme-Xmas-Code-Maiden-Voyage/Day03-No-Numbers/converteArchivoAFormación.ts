export const converteArchivoDeVariasLíneasADobleFormación = async (
  entrada: string,
): Promise<string[][]> => {
  const cadenaDeEntrada = await Deno.readTextFile(entrada);
  const cadenaDeEntradaRecortada = cadenaDeEntrada.trimEnd();
  const formaciónDeCadenaDeEntrada = cadenaDeEntradaRecortada.split(/\n/);
  const dobleFormaciónDeCadenaDeEntrada: string[][] = [];
  formaciónDeCadenaDeEntrada.forEach((línea) => {
    dobleFormaciónDeCadenaDeEntrada.push(línea.split(""));
  });
  return dobleFormaciónDeCadenaDeEntrada;
};
