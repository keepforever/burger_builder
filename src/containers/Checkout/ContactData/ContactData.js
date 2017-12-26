import React, { Component } from 'react';

import Button  from  '../../../components/UI/Button/Button';
import classes from  './ContactData.css';
import axios   from  '../../../axios-orders';
import Spinner from  '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading: false
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
        this.setState( { loading: true } );
        // alert('You Continue!');
        // the .json appendage to the post route is required for
        // Firebase to function correctly.
        const order = {
            ingredients: this.props.ingredients,
            // in a real app, you would calculate price on the server
            // to avoid user manipulating data before hitting server.
            price: this.props.price,
            customer: {
                name: 'Brian Cilenti',
                address: {
                    street: '2443 44th',
                    zipCode: '94116',
                    country: 'USA'
                },
                email: 'heckler246@yahoo.com'
            },
            deliveryMethod: 'fastest'
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


    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name..." />
                <input className={classes.Input} type="email" name="email" placeholder="Your email..." />
                <input className={classes.Input} type="street" name="street" placeholder="Your street..." />
                <input className={classes.Input} type="postalCode" name="postal" placeholder="Your Zip Code..." />
                <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
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
