
export interface IIPState {
 ips:IIPSession[];
 lastConnected: IIPSession;
}

export interface IIPSession {
  id: string;
  clientAddress: string;
  start: Date
}

export interface IIPActionPayload {
  ipSession: IIPSession
}

export const INITIAL_STATE_IP:IIPState = {
  ips:[],
  lastConnected: null
};


