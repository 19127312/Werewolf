export const selectIsAuthenticate = (state) => { return state.auth.username };
export const selectUID = (state) => { return state.auth.user.uid };