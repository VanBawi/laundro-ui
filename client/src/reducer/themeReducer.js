const UPDATE_THEME = "UPDATE_THEME";

const initState = {
  theme: localStorage.getItem("laundro_theme"),
};

const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_THEME:
      localStorage.setItem("theme", action.payload);
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  };
};

export const updateTheme = (theme) => (dispatch) => {
  dispatch({ type: UPDATE_THEME, payload: theme });
};


export default themeReducer;