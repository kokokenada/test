import { Meteor } from 'meteor/meteor';
import { IIPSession } from '../imports/ip-redux-package/ip-types';

Meteor.startup(() => {
  // code to run on server at startup

  let sessions = new Mongo.Collection('sessions');

  // Server starting so delete any sessions from the past
  sessions.remove({});

  // Delete must run in right context, else crash
  // Apparently Meteor.bindEnvironment is missing from meteor typings file
  let deleteFunction = Meteor.bindEnvironment( (id: string) => {
    sessions.remove({id: id});
  });

  // Make sessions collection available for subscription by clients
  Meteor.publish("sessions", function() {

    // Set up callback when socket session ends
    const doneFunction = (x:any) => {
      let ip = this._session.id;
      deleteFunction(ip);
    };
    this._session.socket.on("close", doneFunction);

    return sessions.find(); // what the clients can subscribe to
  });

  // When a new connection happens, add a document to the sessions collection
  Meteor.onConnection( (data: any)=> {
    const ipSession: IIPSession = {
      id: data.id,
      clientAddress: data.clientAddress,
      start: new Date()
    };
    sessions.insert(ipSession);
  })
});
