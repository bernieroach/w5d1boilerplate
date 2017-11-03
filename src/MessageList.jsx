import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


  render() {

    console.log("Rendering <messagelist/>");
    console.log("colour")
    console.log(this.props.colour);
    return (
         <main className="messages">

    {this.props.messages.map((message)=>{ return <Message key = { message.key } message = { message } /> })}

         </main>
    );
  }
}
export default MessageList;