import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import UserCount from './UserCount.jsx';



// APP class
class App extends Component {

// create init
  constructor(props) {
  super(props);
  this.handleNewMessage = this.handleNewMessage.bind(this);
  this.handleChangeCurrentUser = this.handleChangeCurrentUser.bind(this);
  this.state = {
                userCount: 0,
                userColour: "#FFFFFF",
                messages : [],
                currentUser: { name: "Bernie" },
                }
            };

// Change User name
handleChangeCurrentUser(event){
  if (event.charCode == 13){
     const newMessage = { type : 'postNotification',

                       content : `${this.state.currentUser.name} has changed their name to ${event.target.value}`
                      };
    this.webSocket.send(JSON.stringify(newMessage));
    const currentUser = { name : event.target.value };

    this.setState({
                    currentUser : currentUser
                  })
      }
  };
// New Message
handleNewMessage(event){
                    if (event.charCode == 13){
                      const newMessage = { type : 'postMessage',
                                          username : this.state.currentUser.name,
                                           content :  event.target.value,
                                           colour : this.state.userColour
                                          };
                      this.webSocket.send(JSON.stringify(newMessage));
                        }
                    }

// event DidMount
componentDidMount() {

  console.log("componentDimMount <App />");
  this.webSocket = new WebSocket("ws://localhost:3001/");

  this.webSocket.onopen = (event)=>{
    console.log("connection open");
  };


// handle WS message - update state
  this.webSocket.onmessage = (event)=>{
    console.log("message event");
    const currentUser = this.state.currentUser.name;
    const inMessage = JSON.parse(event.data);
    let messages = [];
    switch(inMessage.type){
          case 'incomingMessage':
          delete inMessage.type;
             messages = this.state.messages.concat(inMessage);
            this.setState({
                messages : messages
              })
            break;
          case 'incomingNotification':
          delete inMessage.type;
          inMessage.notification = inMessage.content;
          delete inMessage.content;
          console.log(inMessage);
          console.log("notification");
             messages = this.state.messages.concat(inMessage);
            this.setState({
                messages : messages
              })
            break;
          case  'updateUserCount':
          console.log("update user");
          this.setState( { userCount : inMessage.userCount });
          break;
          case  'updateUserColour':
          console.log("update user colour");
          this.setState( { userColour : inMessage.colour });
          break;
          default:
             throw new Error("Unknown event type " + inMessage.type);
             break;
    }

  };
}

// render component
  render() {
    console.log('app rending');

    return (<div>
      <UserCount userCount = {this.state.userCount} />
      <MessageList messages = {this.state.messages} />
      <Chatbar currentUser = {this.state.currentUser}
               handleNewMessage = {this.handleNewMessage}
               handleChangeCurrentUser = {this.handleChangeCurrentUser}
               updatemessage = {this.updateMessage} />
      </div>
    );
  }
}
export default App;
