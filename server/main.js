import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  let sessions = new Meteor.Collection('sessions');

  Meteor.onConnection( (data)=> {

    console.log('data');
    console.log(data);
    sessions.insert(data);
  })
});
