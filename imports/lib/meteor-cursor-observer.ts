import {Observable, Subscriber} from 'rxjs';
import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import {EDocumentChangeType, IDocumentChange} from './document-change.interface';

// Copied from previous project. (In process of putting in an npm package)


export class MeteorCursorObservers {
  /**
   * Converts a Meteor Mongo cursor to a stream of changes
   * @param cursor
   * @returns {any}
   */
  static fromMeteorCursor<T>(cursor: Mongo.Cursor<any>): Observable<IDocumentChange<T>> {
    return Observable.create((observer: Subscriber<IDocumentChange<T>>) => {
      let handle: Meteor.LiveQueryHandle = cursor.observe({
        added: (doc: T) => {
          observer.next({
            changeType: EDocumentChangeType.NEW,
            newDocument: doc
          });
        },

        changed: (nDoc: T, oDoc: T) => {
          observer.next({
            changeType: EDocumentChangeType.CHANGED,
            newDocument: nDoc,
            oldDocument: oDoc
          });
        },

        removed: (doc: T) => {
          observer.next({
            changeType: EDocumentChangeType.REMOVED,
            oldDocument: doc
          });
        }
      });

      return function unsubscribe() {
        handle.stop();
      };
    });
  }
}
