export const initialState = {
  user: null,
  captionId: null,
  selectedImage: null,
  deleteId: null,
  tagId: null,
  dateSearch: [],
  tagSearch: "",
  currentCaption: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      if (!action.user) {
        return initialState;
      } else {
        return {
          ...state,
          user: action.user
        };
      }
    case "SET_CAPTION_ID":
      return {
        ...state,
        captionId: action.id
      };
    case "SET_TAG_SEARCH":
      return {
        ...state,
        tagSearch: action.tag
      };
    case "SET_DATE_SEARCH":
      return {
        ...state,
        dateSearch: action.date
      };
    case "SET_CURRENT_CAPTION":
      return {
        ...state,
        currentCaption: action.caption
      };
    case "SET_SELECTED_IMAGE":
      return {
        ...state,
        selectedImage: action.image
      };
    case "SET_DELETE_ID":
      return {
        ...state,
        deleteId: action.id
      };
    case "SET_TAG_ID":
      return {
        ...state,
        tagId: action.tagId
      };
    default:
      return state;
  }
};

export default reducer;
