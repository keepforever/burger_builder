import React, { Component } from 'react';

import Button  from  '../../../components/UI/Button/Button';
import classes from  './ContactData.css';
import axios   from  '../../../axios-orders';
import Spinner from  '../../../components/UI/Spinner/Spinner';
import Input from  '../../../components/UI/Input/Input';

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
        formIsValid: false,
        loading: false
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
        this.setState( { loading: true } );
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
            ingredients: this.props.ingredients,
            // in a real app, you would calculate price on the server
            // to avoid user manipulating data before hitting server.
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                // console.log response
                this.setState({loading: false});
                this.props.history.push('/');
            } )
            .catch(error => {
                // also want to set loading to false if we have an error.
                this.setState({loading: false});
            } )

    }

    inputChangedHandler = (event, inputIdentifier) => {
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
        // create all inputs dynamically. Turn order form object into
        // array i can loop through with a 'for-in' loop
        // config is = this.state.orderForm[key], which will be:
        // {
        //     elementType: 'input',
        //     elementConfig: {
        //         type: 'text',
        //         text: 'Your Name'
        //     },
        //     value: ''
        // }

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
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Shipping and Contact Info.  You can trust me.  I love you. And, in time, you will love me too.</h4>
                {form}
            </div>
        );
    }
}

export default ContactData
// old dummy state
// state = {
//     name: '',
//     email: '',
//     address: {
//         street: '',
//         postalCode:''
//     },
//     loading: false
// }
// old version of the Form, wen't wit the old dummy state
// <form>
//    <Input  inputtype="input" type="text" name="name" placeholder="Your name..." />
//    <Input  inputtype="input" type="email" name="email" placeholder="Your email..." />
//    <Input  inputtype="input" type="street" name="street" placeholder="Your street..." />
//    <Input  inputtype="input" type="postalCode" name="postal" placeholder="Your Zip Code..." />
//    <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
//</form>
