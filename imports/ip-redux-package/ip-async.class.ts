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

  ipPlayMiddleware = (ipState: IIPState) => (next: any) => (action: IPayloadAction) => {
    let payload: IIPActionPayload = action.payload;
    switch (action.type) {
      case IPActions.INITIAIZE:
        watchIPS();
        break;
    }
    return next(action);
  };
}


function runSubscription() {
  return Meteor.subscribe('sessions',  {
    onStop: (error: any) => {
      if (error) {
        console.error("Error returned from Meteor.subscribe");
        console.error(error);
      }
    },
    onReady: ()=> {

    }
  });
}

function watchIPS() {
  Tracker.autorun(()=> {
    let subscriptionHandle = runSubscription();
    let ipCollection = new Mongo.Collection("sessions");

    let isReady = true; //subscriptionHandle.ready();
    if (isReady) {

      let ipCursor: Mongo.Cursor<any> = ipCollection.find();

      let ipSessions$:Observable<IDocumentChange<IIPSession>> = MeteorCursorObservers.fromMeteorCursor<IIPSession>(ipCursor);
      ipSessions$.subscribe(
        (ipChange:IDocumentChange<IIPSession>) => {
          switch (ipChange.changeType) {
            case EDocumentChangeType.NEW: {
              IPActions.newIP(ipChange.newDocument); // Dispatc new IP
              break;
            }
            case EDocumentChangeType.REMOVED: {
              IPActions.deleteIP(ipChange.oldDocument);
            }
            default:
          }
        }
      )
    }
  })
}