import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links'; // A Meteor.methods which related to Links collection.
import { WebApp } from 'meteor/webapp';  // WebApp is a server component of meteor, Metoer will use it to handle incoming requests
import ConnectRoute from 'connect-route';  // connect-route is just like the same as Express's router

Meteor.startup(() => {

  // Remove to type in "meteor remove autopublish" in server console first!

   // We will explain why we don't use arrow function as our callback function in Markbin project.
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

// Executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
  // Take the token out of hte url and try to a find a
  // matching link in the Links collection
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    // If we find a link object, redirect the user to the
    // long URL
    Links.update(link, { $inc: { clicks: 1 }});
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    // If we don't find a link object, send the user
    // to our normal React app
    next();
  }
}

// ConnectRoute create a middleware
const middleware = ConnectRoute(function(router) {

  // If the incoming request matches the form of '/ anything' then execute onRoute();
  router.get('/:token', onRoute);
});

// We can add our custom Middleware to our wepApp object
// WebApp.connectHandlers.use(req => console.log(req) );  //print out all the request information

 WebApp.connectHandlers.use(middleware);
