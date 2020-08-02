const initialState = {
  custNameFilter: "",
  technologyFilter: "",
  flowFilter: "",
  productFilter: "",
  gdpwFilter: "",
  automotiveFilter: "",
  limitFilter: ""
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CUST_NAME":
      return {
        ...state,
        custNameFilter: action.payload
      };
    case "TECHNOLOGY":
      return {
        ...state,
        technologyFilter: action.payload
      };
    case "FLOW":
      return {
        ...state,
        flowFilter: action.payload
      };
    case "PRODUCT":
      return {
        ...state,
        productFilter: action.payload
      };
    case "GDPW":
      return {
        ...state,
        gdpwFilter: action.payload
      };
    case "AUTOMOTIVE":
      return {
        ...state,
        automotiveFilter: action.payload
      };
    case "LIMIT":
      return {
        ...state,
        limitFilter: action.payload
      };
    default:
      return state;
  }
};

export default filterReducer;
