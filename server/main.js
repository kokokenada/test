import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  let sessions = new Meteor.Collection('sessions');

  Meteor.publish("sessions", function() {
    console.log(this)
    this._session.socket.on("close", function() {
      console.log('done session');
      console.log(this);
    });
    return sessions.find();
  });

  Meteor.onConnection( (data)=> {

    console.log('data');
    console.log(data);
    sessions.insert(data);
  })
});
