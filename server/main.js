import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  let sessions = new Meteor.Collection('sessions');

  Meteor.publish("sessions", function() {
    this.session.socket.on("close", function() {
      console.log('done session');
      console.log(this);
    });
  });

  Meteor.onConnection( (data)=> {

    console.log('data');
    console.log(data);
    sessions.insert(data);
  })
});
