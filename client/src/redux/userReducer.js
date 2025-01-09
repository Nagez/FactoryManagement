const initialState = {
    currentUser: null, // Initial state for user
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, currentUser: action.payload };
      case 'CLEAR_USER':
        return { ...state, currentUser: null };
      default:
        return state;
    }
  };
  
  // Action creators
  export const setUser = (currentUser) => ({ type: 'SET_USER', payload: currentUser });
  export const clearUser = () => ({ type: 'CLEAR_USER' });
  
  export default userReducer;
  