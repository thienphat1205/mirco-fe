const initialState = { collapse: false };

const UPDATE_COLLAPSE_HEADER = "UPDATE_COLLAPSE_HEADER";

export const updateCollapseHeader = (status: boolean) => {
  return { type: UPDATE_COLLAPSE_HEADER, payload: status };
};

const commonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_COLLAPSE_HEADER: {
      return {
        ...state,
        collapse: action.payload,
      };
    }
  }

  return state;
};

export default commonReducer;
