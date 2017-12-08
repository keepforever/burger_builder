import React, { Component } from 'react';
import Aus from '../../hoc/Aus';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            bacon: 0,
            salad: 0,
            cheese: 0,
            meat: 0
        }
    }
    render() {
    return (
      <Aus>
          <Burger ingredients={this.state.ingredients} />
          <div> Building Controles </div>
      </Aus>
    );
    }
}

export default BurgerBuilder;

// in this component we will control the dynamic rendering of ingredients
// using state.
// since we want to put ingredients on our burger (aka, tell the burger which
// ingredients to render), we will pass in the ingredients object from the state
// as a property.
