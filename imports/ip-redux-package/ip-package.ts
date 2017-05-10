import { ReduxPackage, IAppState, IPayloadAction} from 'redux-package';
import { ipconnectReducer } from "./ip-reducer";
import { IPAsync } from "./ip-async.class";
import { IPActions } from "./ip-actions";

export class IPPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name:'ipSessions', reducer:ipconnectReducer}];
  actions = IPActions;
  constructor() {
    super();
    const connectAsync = new IPAsync();
    this.middlewares.push(
      connectAsync.ipPlayMiddleware
    );
  }
}
