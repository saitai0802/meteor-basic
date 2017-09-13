import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import BinsEditor from './bins_editor';
import BinsViewer from './bins_viewer';
import BinsShare from './bins_share';

class BinsMain extends Component {

  // if (!this.props.bin) is to prevent undefined when bin haven't retrived yet.
  render() {
    if (!this.props.bin) { return <div>Loading...</div>; }

    return (
      <div>
        <BinsEditor bin={this.props.bin} />
        <BinsViewer bin={this.props.bin} />
        <BinsShare bin={this.props.bin} />
      </div>
    );
  }
}

export default createContainer((props) => {
  const { binId } = props.params;

  // The reason we subscribe bin again and list, because we needa make sure
  // refresh this page AND direct access to this page is also kick off the subscription
  Meteor.subscribe('bins');
  Meteor.subscribe('sharedBins'); //get list of currrent user

  return { bin: Bins.findOne(binId) };  // find this id
}, BinsMain);
