/* eslint-disable no-console,no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TrEditor from '@/modules/messages/client/components/TrEditor';

export default function ThreadReply({ onSend }) {
  const [editorKeyCounter, setEditorKeyCounter] = useState(0);
  const [content, setContent] = useState('');
  function send(event){
    event.preventDefault();
    event.stopPropagation();
    // remove the last <br>
    onSend(content.replace(/<br><\/p>$/, '</p>'));
    setContent('');
    // There is a bug somewhere that means just setting content to '' does not
    // the text in the editor after pressing send, we can work around that by
    // recreating the TrEditor component after each send by setting a fresh key
    setEditorKeyCounter(n => n + 1);
  }
  return (
    <form
      id="message-reply"
      name="messageForm"
      className="form-horizontal"
      onSubmit={event => send(event)}
    >
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <TrEditor
              key={editorKeyCounter}
              id="message-reply-content"
              text={content}
              onChange={text => setContent(text)}
              onCtrlEnter={event => send(event)}
            />
          </div>
        </div>
      </div>
      <div className="col-xs-2 col-sm-12">
        <small className="text-muted hidden-xs">
          Highlight text to add links or change its appearance.
          Ctrl+Enter to send.
        </small>
        <button
          id="messageReplySubmit"
          className="btn btn-md btn-primary message-reply-btn"
          type="submit"
        >
          <i className="icon-send"/><span className="hidden-xs"> Send</span>
        </button>
      </div>
    </form>
  );
}

ThreadReply.propTypes = {
  onSend: PropTypes.func.isRequired,
};
