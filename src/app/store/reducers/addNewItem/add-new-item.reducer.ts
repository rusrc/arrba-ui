import {
  AddNewItemActionTypes,
  AddNewItemActions
} from '../../actions/addNewItem/add-new-item.actions';
import { IMessage } from '../../../models/message';


export interface State {
  messages: { [itemId: number]: IMessage };
  selected: IMessage;
}

export const initialState: State = {
  messages: {
    0: { itemId: 0, text: '' }
  },
  selected: { itemId: 0, text: '' }
};

export function reducer(state = initialState, action: AddNewItemActions): State {
  switch (action.type) {
    case AddNewItemActionTypes.addNewItem:
      const message = action.message;
      return {
        ...state,
        messages: { ...state.messages, ...{ [message.itemId]: message } },
        selected: message
      };
    default:
      return state;
  }
}
