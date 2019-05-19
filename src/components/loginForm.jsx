import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from "./common/input";

class loginForm extends Component {

state = {
    account: { username: '', password: ''},
    errors: {}
};

schema = {
    username: Joi.string()
      .required().label('Username'),
    password: Joi.string()
      .required().label('Password')
  };

validate = () => {
    const options = { abortEarly: false};
    const { error } = Joi.validate(this.state.account, this.schema, options);
    //mapping joi object note joy only return an error field on the object only if there is an error
    //check for an error on the JOI object
    if(!error) return null

    const errors = {}
    for(let item of error.details)
        errors[item.path[0]] = item.message //get the first item out the path object
    return errors
}
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    // console.log(errors);
    //this should always reset to the errors or an empty object
    this.setState({ errors: errors || {} });
    if(errors) return;
    //call the server in the future
    console.log("submitted");
  };

  validateProperty = ({name,value}) => {    
     const obj = {[name]: value};
     //this creates a schema with only one property
     const schema = { [name]: this.schema[name]}
     const {error} = Joi.validate(obj,schema);
     return error ? error.details[0].message: null;  
  }

  handleChange = ({ currentTarget: input }) => {
     //clone the error state
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if(errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    //clone the state
    const account = {...this.state.account};
    account[input.name] = input.value;
    // account.username = e.currentTarget.value;
    
    this.setState({account,errors});
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