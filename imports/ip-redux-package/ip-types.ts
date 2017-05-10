
export interface IIPState {
 ips:IIPSession[];
}

export interface IIPSession {
  address: string;
}

export interface IIPActionPayload {
  ipSession: IIPSession
}

export const INITIAL_STATE_IP:IIPState = {
  ips:[]
};


