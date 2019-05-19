import React, { Component } from 'react';
import Input from "./common/input";

class loginForm extends Component {

state = {
    account: { username: '', password: ''}
};

  handleSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    //clone the state
    const account = {...this.state};
    account[input.name] = input.value;
    // account.username = e.currentTarget.value;
    
    this.setState({account});
  };
  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={account.username}
            label='Username'
            onChange={this.handleChange}
          />
          <Input
            name='password'
            value={account.password}
            label='Password'
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
export default loginForm;