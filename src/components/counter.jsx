import React, { Component } from 'react';

class Counter extends Component {

    state = {
        count : 0,
    }
    handleIncrement = ()=> {
        console.log('Increment Clicked ', this);
    }
    render() { 
        return (
          <React.Fragment>
            <span
              className={this.getBadgeClasses()}
            >
              {this.formatCount()}
            </span>
            <button 
            onClick={this.handleIncrement}
            className="btn btn-secondary btn-sm">
              Increment
            </button>
            {/* <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul> */}

          </React.Fragment>
        );
    }

    getBadgeClasses () {
        let classes = "badge m-2 badge-";
        const{count} = this.state;

        classes += count === 0 ? 'warning' : 'primary';

        return classes;
    }
    formatCount (){
        const{count} = this.state;
         return count === 0 ? <h1>Zero</h1> : count;
    }
}
 
export default Counter;