import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

// funtional component
// const EmployeeList = (props) =>{}

// Class base component
class EmployeeList extends Component {
  componentWillMount() {
    this.page = 1;
  }

  handleButtonClick() {

    // Only want our component re-render when subscribe updates
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    // props.employees => an array of employee objects
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee =>
            <EmployeeDetail key={employee._id} employee={employee} />
          )}
        </div>
        <button onClick={this.handleButtonClick.bind(this)}
          className="btn btn-primary">
          Load More...
        </button>
      </div>
    );
  }
};

// export default EmployeeList;
export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);

  // return an object.  Whatever we return will be sent to EmployeeList as props
  // Employees.find({}) <=== only retuen a Cursor, not a result of data.
  return { employees: Employees.find({}).fetch() };  // employees object will be a props in our EmployeeList component!
}, EmployeeList);
