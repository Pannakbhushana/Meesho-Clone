import * as types from "./product.type";



const init={
    protypes:"women",
    isLoading:false,
    Products:[],
    isError:false,
    currPage:1
}


export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case types.PRODUCTS_LOAD:
      return { ...state, isLoading: true };
    case types.PRODUCTS_SUCCESS:
      return { ...state, isLoading: false, Products: payload };
    case types.PRODUCTS_ERROR:
      return { ...state, isError: true, isLoading: false };
    case types.PRODUCTS_TYPE:

            return {...state,protypes:payload}
    case types.PRODUCTS_PAGE:
            return {...state,currPage:payload}

    default:
      return state;
  }
};
