import React, { Component } from 'react';

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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={account.username}
              onChange={this.handleChange}
              id="username"
              name='username'
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
            value={account.password}
            onChange={this.handleChange}
            id="password" 
            name='password'
            type="text" 
            className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
export default loginForm;