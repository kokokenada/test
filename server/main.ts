import { Meteor } from 'meteor/meteor';
import { IIPSession } from '../imports/ip-redux-package/ip-types';

Meteor.startup(() => {

  let sessions = new Mongo.Collection('sessions');
  // Server starting so delete any sessions from the past
  sessions.remove({});

  // code to run on server at startup

  // Delete must run in right context, else crash
  let deleteFunction = Meteor.bindEnvironment( (id: string) => {
    sessions.remove({id: id});
  });

  Meteor.publish("sessions", function() {
    const doneFunction = (x:any) => {

      let ip = this._session.id;
//      console.log('done session this._sessison.id ');
//      console.log(ip)
      deleteFunction(ip);
    };
    this._session.socket.on("close", doneFunction);
    return sessions.find();
  });

  Meteor.onConnection( (data: any)=> {

    const ipSession: IIPSession = {
      id: data.id,
      clientAddress: data.clientAddress,
      start: new Date()
    };
//    console.log('data!');
//    console.log(ipSession);
    sessions.insert(ipSession);
  })
});
