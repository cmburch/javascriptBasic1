import { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //mapping joi object note joy only return an error field on the object only if there is an error
    //check for an error on the JOI object
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message; //get the first item out the path object
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    //this creates a schema with only one property
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    // console.log(errors);
    //this should always reset to the errors or an empty object
    this.setState({ errors: errors || {} });
    if(errors) return;
   //this method must be implemented in parent
   //this method can be use as a call to the server when form is submitted
    this.doSubmit();
  };


  handleChange = ({ currentTarget: input }) => {
    //clone the error state
   const errors = {...this.state.errors};
   const errorMessage = this.validateProperty(input);
   if(errorMessage) errors[input.name] = errorMessage;
   else delete errors[input.name];

   //clone the state
   const data = {...this.state.data};
   data[input.name] = input.value;
   // data.username = e.currentTarget.value;
   
   this.setState({data,errors});
 };

}
 
export default Form;