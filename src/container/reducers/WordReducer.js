// defines the initial state of the application
const initState = {
  //length: 0,
  wordList: [],
};
// defines the reducer function where state is updated according to action type
export const WordReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL":
      return {
        ...state,
        wordList: [...action.payload],
      };
    case "SEARCH_WORD":
      return {
        ...state,
        wordList: [...action.payload],
      };
    case "ADD_WORD":
      return {
        ...state,
        wordList: [...state.wordList, action.payload],
      };
    default:
      return state;
  }
};
