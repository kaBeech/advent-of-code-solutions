import { integer } from "../tools/commonTypes.ts";

const Tree = (row: number, column: number, height: integer) => {
    const state = {
        location: [row, column];
        height,
        visibility: [null, null, null, null] as ModalBoolean[];
      }
    return {
        ...locationGetter(state),
        ...heightGetter(state),
        ...visibilityGetter(state),
        ...visibilitySetter(state),
    };
  };
  
  export default Tree;