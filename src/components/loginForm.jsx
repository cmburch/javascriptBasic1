import React, { Component } from 'react';
import Input from "./common/input";

class loginForm extends Component {

state = {
    account: { username: '', password: ''},
    errors: {}
};

validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is require";
    if (account.password.trim() === "")
      errors.password = "Password is require";

    //if the error object does not have properties return null else return the errors
    return Object.keys(errors).length === 0 ? null : errors;
}
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    //this should always reset to the errors or an empty object
    this.setState({ errors: errors || {} });
    if(errors) return;
    //call the server in the future
    console.log("submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    //clone the state
    const account = {...this.state.account};
    account[input.name] = input.value;
    // account.username = e.currentTarget.value;
    
    this.setState({account});
  };
  render() {
    const { account,errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={account.username}
            label='Username'
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name='password'
            value={account.password}
            label='Password'
            onChange={this.handleChange}
            error={errors.password}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
export default loginForm;