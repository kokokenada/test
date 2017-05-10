import { Meteor } from 'meteor/meteor';
import {IIPSession} from '../imports/ip-redux-package/ip-types';

Meteor.startup(() => {

  let sessions = new Meteor.Collection('sessions');
  // Server starting so delete any sessions from the past
  sessions.remove({});

  // code to run on server at startup


  Meteor.publish("sessions", function() {
    this._session.socket.on("close", function() {
      console.log('done session');
      console.log(this);
      let ip = this._session.remoteAddress;
      console.log(ip)
      sessions.remove({clientAddress: ip});
    });
    return sessions.find();
  });

  Meteor.onConnection( (data)=> {

    const ipSession: IIPSession = {
      id: data.id,
      clientAddress: data.clientAddress,
      start: new Date()
    };
    console.log('data!');
    console.log(data);
    console.log(ipSession);
    sessions.insert(ipSession);
  })
});
