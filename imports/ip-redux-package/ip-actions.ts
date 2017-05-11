import { IPayloadAction, ReduxPackageCombiner} from 'redux-package'; // To Do: support DI for ReduxPackageCombiner to allow for unit tests
import {IIPActionPayload, IIPSession} from './ip-types';

export class IPActions {

  private static prefix = 'IP_';
  static NEW_IP = IPActions.prefix + 'NEW_IP';
  static DELETE_IP = IPActions.prefix + 'DELETED_IP';
  static INITIAIZE = IPActions.prefix + 'INITIALIZE';

  static newIP(ipSession:IIPSession) {
    let payload:IIPActionPayload = { ipSession };
    let action:IPayloadAction = {
      type: IPActions.NEW_IP,
      payload
    };
    ReduxPackageCombiner.dispatch(action);
  }

  static deleteIP(ipSession:IIPSession) {
    let payload:IIPActionPayload = { ipSession };
    let action:IPayloadAction = {
      type: IPActions.DELETE_IP,
      payload
    };
    ReduxPackageCombiner.dispatch(action);
  }

  static initialize() {
    let action:IPayloadAction = {
      type: IPActions.INITIAIZE
    };
    ReduxPackageCombiner.dispatch(action);
  }

}