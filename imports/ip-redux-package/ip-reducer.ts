
import { IPayloadAction } from 'redux-package';
import { IPActions } from './ip-actions';
import {IIPState, IIPActionPayload, INITIAL_STATE_IP, IIPSession} from './ip-types'


export function ipconnectReducer(
  state: IIPState = INITIAL_STATE_IP,
  action: IPayloadAction): IIPState {

  let payload:IIPActionPayload = action.payload;
  switch (action.type) {

    case IPActions.NEW_IP:
      return {...state, ips: state.ips.concat(payload.ipSession), lastConnected: payload.ipSession}; // Concat is immuatable

    case IPActions.DELETE_IP:
      const newArray: IIPSession[] = [];
      state.ips.forEach( ( ip:IIPSession ) => {
        if ( ip.id !== payload.ipSession.id ) {
          newArray.push( ip );
        }
      } );
      return {...state, ips: newArray};

    default:
      return state;
  }
}

