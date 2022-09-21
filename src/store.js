function createStore(initialState) {
  let currentState = initialState;
  return {
    getState: () => currentState,
    setState: (newState) => (currentState = newState),
  };
}

const store = createStore({ user: {} });

export default store;
