import { Mongo } from 'meteor/mongo';

// Remember to import this collections in our both slient and server side!!
// Which is client/main.js and server/main.js
Meteor.methods({

  // bins.insert is just a normal javascript key.
  'bins.insert': function() { // We don't use flat arrow function to may Meteor knows this.userId

    // Collection.insert() will return ID of the item we just created!
    return Bins.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [], // Array of email address of user
      // https://docs.meteor.com/api/methods.html#DDPCommon-MethodInvocation-userId
      ownerId: this.userId // A loggined user's id. if user is not logged in, then valuable null will be return.
    });
  },

  'bins.remove': function(bin) {
    return Bins.remove(bin);
  },

  // https://docs.meteor.com/api/collections.html#Mongo-Collection-update
  // Modify one or more documents in the collection. Returns the number of matched documents.
  'bins.update': function(bin, content) {
    return Bins.update(bin._id, { $set: { content } }); // $set: mongo modifier
  },

  'bins.share': function(bin, email) {
    return Bins.update(bin._id, { $push: { sharedWith: email }});
  }
});

export const Bins = new Mongo.Collection('bins');
