export const selectIsAuthenticate = (state) => { return state.auth.user };
export const selectUID = (state) => { return state.auth.user.uid };