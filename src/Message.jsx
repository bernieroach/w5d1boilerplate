import React, {Component} from 'react';

class Message extends Component {
  render() {
console.log("Rendering <message/>");
console.log("colour");
console.log(this.props.message.colour);
console.log(this.props);
    return (
      <div>

     <div className="message">
    <span className="message-username" style={{color: this.props.message.colour}}>{this.props.message.username}</span>
    <span className="message-content" dangerouslySetInnerHTML={{__html: this.props.message.content}}></span>
  </div>

  <div className="message system">
      {this.props.message.notification}

  </div>

  </div>
    );
  }
}
export default Message;