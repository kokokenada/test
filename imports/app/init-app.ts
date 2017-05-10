import { IPayloadAction, ReduxPackageCombiner} from 'redux-package';
import {IPPackage} from '../ip-redux-package/ip-package';
import {IPActions} from '../ip-redux-package/ip-actions';

export function initApp() {
  ReduxPackageCombiner.configure([
      new IPPackage(),
    ],
    null,
    {consoleLogging: true}
  );
  IPActions.initialize();

}