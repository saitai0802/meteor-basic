// Only executed on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  console.log("numberRecords: " + numberRecords ); // <== this console will be show in our terimal.

  if (!numberRecords) {
    // Generate some data...
    _.times(5000, () => {   // Kinda nice replacment of a normal for loop.
      const { name, email, phone } = helpers.createCard();  //createCard: create a contact card containing many properties

      /*
      Because  the value of the key are identical, the ES6 generator will automatically expanded out to syntax  like below version.
      Employees.insert({
        name: name,
        email: email,
        phone: phone,
        avatar: image.avatar()
      });
      */

      // ES6 systnax
      Employees.insert({
        name, email, phone,
        avatar: image.avatar() // generates a real image that hosted online in the browser.
      });
    });
  }

  // Publish emplyees collection.
  // Rmember to give it a limitation or else it will pass all the data back to client!!!!
  Meteor.publish('employees', function(per_page) {
    //return Employees.find({}, { limit: per_page });
    return Employees.find({}, { limit: per_page });
  });
});
