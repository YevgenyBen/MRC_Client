const initialState = {
  show: false,
  ChartInfo: "",
  productName: "",
  percentile: ""
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PERCENTILE":
      return {
        ...state,
        percentile: action.payload
      };
    case "PRODUCT_NAME":
      return {
        ...state,
        productName: action.payload
      };
    case "CHART_INFO":
      return {
        ...state,
        ChartInfo: action.payload
      };
    case "MODAL_SHOW":
      return {
        ...state,
        show: action.payload
      };
    case "MODAL_HIDE":
      return {
        ...state,
        show: action.payload
      };
    default:
      return state;
  }
};
export default modalReducer;
