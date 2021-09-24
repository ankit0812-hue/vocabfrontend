import axios from "axios";
// action function for getting all words
export const getAllItems = () => {
  return async (dispatch) => {
    try {
      const request = await axios.get(
        "https://vocabularyapp0812.herokuapp.com/backend/"
      );
      if (request.status === 200) {
        const response = request.data;
        return dispatch({
          type: "GET_ALL",
          payload: response.words,
        });
      }
    } catch (error) {
      throw Error(error);
    }
  };
};
// action function for searching a particular word
export const searchWord = (word) => {
  return async (dispatch) => {
    try {
      const request = await axios.get(
        `https://vocabularyapp0812.herokuapp.com/backend/search?word=${word}`
      );
      if (request.statusText === "OK") {
        const response = await request.data;
        if (response.error) {
          throw new Error(response.status);
        } else {
          return dispatch({
            type: "SEARCH_WORD",
            payload: response.result,
          });
        }
      }
    } catch (error) {
      throw Error(error);
    }
  };
};
// action function for adding a new word
export const addNewWord = (word) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(
        "https://vocabularyapp0812.herokuapp.com/backend/add",
        {
          word: word.toLowerCase(),
        }
      );
      if (request.statusText === "OK" && request.status === 200) {
        const response = await request.data;
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch({
            type: "ADD_WORD",
            payload: response.words,
          });
        }
      }
    } catch (error) {
      throw Error(error);
    }
  };
};
