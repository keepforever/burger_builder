import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
// because we are fetching data from a backend, we want to handle catched
// errors in a broader way.
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// must import connect function for mapDispatchToProps
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner       from    '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
// kick off the async fetch orders trio of actions by 'flicking first domino'
    this.props.onFetchOrders(this.props.token);
    }
    render(){
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ) )
        };
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
// the order prop on state referes to the slice of state managed by the order reducer
// orders then reaches out to the orders property in the state of the order reducer.
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(
            actions.fetchOrders(token)
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
