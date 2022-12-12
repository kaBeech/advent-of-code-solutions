const parseTreesString = async (treesFile: string) => {
    const treesString = await Deno.readTextFile(treesFile);
    const treesStringTrimmed = treesString.trimEnd()
    return treesStringTrimmed.split(/\n/);
  };

  export {parseTreesString}