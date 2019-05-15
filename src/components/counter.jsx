import React, { Component } from 'react';

class Counter extends Component {

    state = {
        count : 0
    }
    //use camel case to define styles
    styles ={
        fontSize : '25px',
        fontWeight: 'bold'
    } 
    render() { 
        return (
          <React.Fragment>
            <span
              style={this.styles}
              className="badge badge-primary m-2"
            >
              {this.formatCount()}
            </span>
            <button className="btn btn-secondary btn-sm">
              Increment
            </button>
          </React.Fragment>
        );
    }

    formatCount (){
        const{count} = this.state;
         return count === 0 ? <h1>Zero</h1> : count;
    }
}
 
export default Counter;