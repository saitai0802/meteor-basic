import React, { Component } from 'react';
import { markdown } from 'markdown';

class BinsViewer extends Component {
  render() {
    const rawHTML = markdown.toHTML(this.props.bin.content);


    // dangerouslySetInnerHTML: That maybe allow user to create a xss attack
    // xss: cross site scripting (Inject javasciprt to the value)
    return (
      <div className="col-xs-4">
        <h5>Output</h5>
        <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div>
      </div>
    );
  }
}

export default BinsViewer;
