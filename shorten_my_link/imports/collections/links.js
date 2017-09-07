import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';  // Macth allows us to run a custom validator function.


Meteor.methods({
  'links.insert': function(url) { // links.insert is a valid javascript key, 咁寫清楚D

    // Check() will return a javascirpt error if match is failed. And that error
    // can be communicated back to the client side.
    check(url, Match.Where(url => validUrl.isUri(url)));

    // We're ready to save the url
    const token = Math.random().toString(36).slice(-5);

    // This record  will be insert no matter what in client side.
    // If check() return true => no error return to client side
    // If check() return false => error return to client side, client side will revert the data.
    Links.insert({ url, token, clicks: 0 });
  }
});

// Remember to import this object on both client and server side!
export const Links = new Mongo.Collection('links');
