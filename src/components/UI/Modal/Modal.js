import React, { Component } from 'react';

import classes from './Modal.css';
import Aus from '../../../hoc/Aus';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
//  Here we're seaking performance gains. The Modal wraps the order summary
//  which isn't visible until clicking "order now" button. We will try and
//  the only reason to update is when the show property of Backdrop chagees.
    shouldComponentUpdate(nextProps, nextState){
        // we need to fine tune the logic because the spinner will not show
        // because the modal component isn't updating, only the children.
        return ( nextProps.show !== this.props.show ||
                 nextProps.children !== this.props.children )
    }
    componentWillUpdate (){
        console.log('[MODAL] Will Update');
    }
    render() {


        return(
            <Aus>
                <Backdrop show={this.props.show}
                          clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aus>
        );
    }
}
export default Modal;

// this is a "wrapping component" and we utilze this.props.children
// to display whatever we wrap with <Modal></Modal> with a specific
// styling or functionality.
