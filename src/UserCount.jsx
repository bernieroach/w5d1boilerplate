import React, {Component} from 'react';

class UserCount extends Component {
  render() {
console.log("Rendering <usercount/>");
    return (
      <div>
    <span className="usercount">Users online: {this.props.userCount}</span>
  </div>
    );
  }
}
export default UserCount;