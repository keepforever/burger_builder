import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
// because we are fetching data from a backend, we want to handle catched
// errors in a broader way.
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    // we use component did mount because we only want to fetch Orders
    // when the Orders page is visited.  orders refers to the node in the
    // backend.
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                // want to turn the javascript object we get back from firebase
                // into an array.
                const fetchedOrders = [];
                // the keys in this for loop are the id's created by firebase
                // ...res.data[key] distributes all properties of fetched object to
                // the new object, appending the key as the idea, then pushes that
                // to fetchedOrders.
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }

                this.setState({loading: false, orders: fetchedOrders})

            })
            .catch(err => {
                this.setState({loading: false})
            });

    }

    render(){


        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>

        );
    }
}

export default withErrorHandler(Orders, axios)
