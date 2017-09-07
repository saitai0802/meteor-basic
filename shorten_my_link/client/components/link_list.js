import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';

class LinkList extends Component {
  renderRows() {
    return this.props.links.map(link => {
      const { url, clicks, token } = link;
      const shortLink = `http://localhost:3000/${token}`; //ES6 template string format

      return (
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={shortLink}>{shortLink}</a>
          </td>
          <td>
            {clicks}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Address</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

// export default LinkList;

// Remember to use container when everytime we are consuming a publication
//  with a subscription into a container.
export default createContainer(() => {
  Meteor.subscribe('links'); // You may find links publication in /server/main.js

  return { links: Links.find({}).fetch() };
}, LinkList);
