import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Button  from  '../../../components/UI/Button/Button';
import classes from  './ContactData.css';
import axios   from  '../../../axios-orders';
import Spinner from  '../../../components/UI/Spinner/Spinner';
import Input from  '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';



class ContactData extends Component {
// important to use default html element names inside elementConfig object
// state here is all UI state info and thus not a great candidate for
// redux managment
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }
    // we don't use the arrow syntax because we do not need to call
    // this method with the "this.method" syntax.
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log('[ContactData orderHandler]', this.props.ingredients);
        // No longer want to send to firebase immidiatly
        // want to navigate to checkout component instead.
        // Since BurgerBuilder is part of the routable area of our project
        // we have access to the match, location, and history props.
        // Here we toggle the loading state to true so the
        // spinner is displayed
        // Want to collect form information
        const formData = {};
        // formElementIdentifier is email, country, name, etc
        for (let formElementIdentifier in this.state.orderForm) {
            // populating formData with key value pairs, name: "Brian", etc
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier]
        }
        // alert('You Continue!');
        // the .json appendage to the post route is required for
        // Firebase to function correctly.
        const order = {
            ingredients: this.props.ings,
            // in a real app, you would calculate price on the server
            // to avoid user manipulating data before hitting server.
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        // send order to the redux store

        this.props.onOrderBurger(order, this.props.token);
    }
    // we expect an event to be passed by React because this method is attached
    // to an event listener, in this case, onChange.
    // the inputIdentifier is needed to set up the two-way-binding so that
    // we can update the correct value for the state.  The inputIdentifier
    // originates from the id, generated in the formElementsArray for-in loop
    // in the render method.
    // console.log(event.target.value);
    // immutably update state by first copying it into new variable
    // Here we are to be aware that we need to "clone deeply", which means that
    // the nexted objects, i.e. elementConfig, would not be handled immutably
    // with our convential use of the spread operator
    inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // cloning deeply
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        //console.log("UPDATED_FORM_ELEMENT", updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // checks if form fields are invalid and updates state
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log("formisValid:", formIsValid)
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>

                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Shipping and Contact Info. </h4>
                {form}
            </div>
        );
    }
}

// this will give us access to the ingredients property in our state via
// "this.props.ings"
// we grab userId from the store to use in displaying user specific info
// and making it a property on the order object that gets stored on server.
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(
            actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
