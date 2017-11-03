import React, {Component} from 'react';

class Chatbar extends Component {


  render() {
    console.log("Rendering <chatbar/>");
    return (
       <footer className= "chatbar">

       <input className="chatbar-username" placeholder= {this.props.currentUser.name} onKeyPress = {this.props.handleChangeCurrentUser} />
       <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress = {this.props.handleNewMessage} />
       </footer>
    );
  }

}
export default Chatbar;

