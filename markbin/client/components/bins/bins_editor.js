import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

// A markdown editor
import 'codemirror/mode/markdown/markdown';  // import and execute all the code inside this file

class BinsEditor extends Component {
  onEditorChange(content) {  // this is a markdown Component event
    Meteor.call('bins.update', this.props.bin, content);
  }

  render() {
    return(
      <div className="col-xs-8">
        <h5>Input</h5>
        <CodeMirror
          value={this.props.bin.content}
          onChange={this.onEditorChange.bind(this)}
          options={{ mode: 'markdown', lineNumbers: true }} />
      </div>
    );
  }
}

export default BinsEditor;
