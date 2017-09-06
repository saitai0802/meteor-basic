// Declare our collection
import { Mongo } from 'meteor/mongo';

// The mongoDB database is automatically executed,
// automatically created when ever we make or run this application!
export const Employees = new Mongo.Collection('employees');
