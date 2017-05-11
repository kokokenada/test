import { IPayloadAction } from 'redux-package';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';


import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';

import { IPActions } from "./ip-actions";
import {EDocumentChangeType, IDocumentChange} from '../lib/document-change.interface';
import {IIPActionPayload, IIPSession, IIPState} from './ip-types';
import {MeteorCursorObservers} from '../lib/meteor-cursor-observer';

export class IPAsync {

  /**
   *
   * @param ipState
   *
   * Redux middleware to handle communication with server
   *
   */
  ipPlayMiddleware = (ipState: IIPState) => (next: any) => (action: IPayloadAction) => {
    switch (action.type) {
      case IPActions.INITIAIZE:
        watchIPS();
        break;
    }
    return next(action);
  };
}

/**
 *
 * @returns {Meteor.SubscriptionHandle}
 *
 * Tells meteor server we want to be notified of changes to sessions collection
 *
 */
function runSubscription() {
  return Meteor.subscribe('sessions',  {
    onStop: (error: any) => {
      if (error) {
        console.error("Error returned from Meteor.subscribe");
        console.error(error);
      }
    },
    onReady: ()=> {}
  });
}

/**
 * Subcribe to changes to sessions (a Mongo collection) and fire redux actions on changes
 */
function watchIPS() {
  let subscriptionHandle = runSubscription(); // Startup could be more robust by find() only when ready
  let ipCollection = new Mongo.Collection("sessions");
  let ipCursor: Mongo.Cursor<any> = ipCollection.find();

  // Convert changes to sessions collection to an RxJS stream
  let ipSessions$:Observable<IDocumentChange<IIPSession>>
    = MeteorCursorObservers.fromMeteorCursor<IIPSession>(ipCursor);
  ipSessions$.subscribe(
    (ipChange:IDocumentChange<IIPSession>) => {
      switch (ipChange.changeType) {
        case EDocumentChangeType.NEW: {
          IPActions.newIP(ipChange.newDocument); // Dispatch new IP
          break;
        }
        case EDocumentChangeType.REMOVED: {
          IPActions.deleteIP(ipChange.oldDocument); // Dispatch end of session
        }
        default:
      }
    }
  );
}
