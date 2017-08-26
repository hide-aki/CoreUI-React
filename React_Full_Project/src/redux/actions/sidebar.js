import { CALL_API } from '../middleware/api';
import * as ACTION from '../constants/sidebar';

export const list = () => {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:3000/nav/',
      init: {
        method: 'GET',
      },
      types: [
        ACTION.SIDEBAR_LIST_REQUEST,
        ACTION.SIDEBAR_LIST_SUCCESS,
        ACTION.SIDEBAR_LIST_FAILURE,
      ],
    }
  };
};
