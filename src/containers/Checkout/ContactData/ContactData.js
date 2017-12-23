import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Shipping and Contact Info.  You can trust me.  I love you. And, in time, you will love me too.</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name..." />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email..." />
                    <input className={classes.Input} type="street" name="street" placeholder="Your street..." />
                    <input className={classes.Input} type="postalCode" name="postal" placeholder="Your Zip Code..." />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData
