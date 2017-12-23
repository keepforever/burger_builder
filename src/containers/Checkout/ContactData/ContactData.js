import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

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
            <div>
                <h4>Enter Shipping and Contact Info.  You can trust me.  I love you. And, in time, you will love me too.</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name..." />
                    <input type="email" name="email" placeholder="Your email..." />
                    <input type="street" name="street" placeholder="Your street..." />
                    <input type="postalCode" name="postal" placeholder="Your Zip Code..." />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export defalut ContactData
