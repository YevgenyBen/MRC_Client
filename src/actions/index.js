export const actions = {
  PERCENTILE: val => {
    return {
      type: "PERCENTILE",
      payload: val
    };
  },
  PRODUCT_NAME: val => {
    return {
      type: "PRODUCT_NAME",
      payload: val
    };
  },
  CHART_INFO: val => {
    return {
      type: "CHART_INFO",
      payload: val
    };
  },
  MODAL_SHOW: val => {
    return {
      type: "MODAL_SHOW",
      payload: true
    };
  },
  MODAL_HIDE: val => {
    return {
      type: "MODAL_HIDE",
      payload: false
    };
  },
  CUST_NAME: val => {
    return {
      type: "CUST_NAME",
      payload: val
    };
  },
  TECHNOLOGY: val => {
    return {
      type: "TECHNOLOGY",
      payload: val
    };
  },
  FLOW: val => {
    return {
      type: "FLOW",
      payload: val
    };
  },
  PRODUCT: val => {
    return {
      type: "PRODUCT",
      payload: val
    };
  },
  GDPW: val => {
    return {
      type: "GDPW",
      payload: val
    };
  },
  AUTOMOTIVE: val => {
    return {
      type: "AUTOMOTIVE",
      payload: val
    };
  },
  LIMIT: val => {
    return {
      type: "LIMIT",
      payload: val
    };
  }
};
