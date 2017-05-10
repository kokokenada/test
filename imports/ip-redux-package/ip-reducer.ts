
import { IPayloadAction } from 'redux-package';
import { IPActions } from './ip-actions';
import {IIPState, IIPActionPayload, INITIAL_STATE_IP} from './ip-types'


export function ipconnectReducer(
  state: IIPState = INITIAL_STATE_IP,
  action: IPayloadAction): IIPState {

  let payload:IIPActionPayload = action.payload;
  switch (action.type) {
    case IPActions.NEW_IP:
      return {...state, ips: state.ips.concat(payload.ipSession)}; // Concat is immuatble
    default:
      return state;
  }
}

