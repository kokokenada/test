/**
 * The redux store state - (immutablejs seemed like overkill)
 */
export interface IIPState {
 ips:IIPSession[];
 lastConnected: IIPSession;
}

/**
 * A Connected client
 */
export interface IIPSession {
  id: string;
  clientAddress: string;
  start: Date
}

/**
 * Payload for redux acitons
 */
export interface IIPActionPayload {
  ipSession: IIPSession
}

export const INITIAL_STATE_IP:IIPState = {
  ips:[],
  lastConnected: null
};


