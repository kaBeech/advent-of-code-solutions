import { ModalBoolean } from "../../tools/commonTypes.ts";

interface BoilerplateConstructorState {
  modalBoolean: ModalBoolean;
}

const modalBooleanGetter = (state: BoilerplateConstructorState) => ({
  getModalBoolean: () => state.modalBoolean,
});

const modalBooleanSetter = (state: BoilerplateConstructorState) => ({
  setModalBoolean: (newModalBoolean: ModalBoolean) => {
    state.modalBoolean = newModalBoolean;
  },
});

const BoilerplateConstructor = (
  modalBoolean: ModalBoolean,
) => {
  const state = {
    modalBoolean,
  };

  return {
    ...modalBooleanGetter(state),
    ...modalBooleanSetter(state),
  };
};

export { BoilerplateConstructor };
