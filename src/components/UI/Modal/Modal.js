import React from 'react';

import classes from './Modal.css';
import Aus from '../../../hoc/Aus';
import Backdrop from '../Backdrop/Backdrop';


const modal = ( props ) => (
    <Aus>
        <Backdrop show={props.show}
                  clicked={props.modalClosed}/>
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aus>
);

export default modal;

// this is a "wrapping component" and we utilze props.children
// to display whatever we wrap with <Modal></Modal> with a specific
// styling or functionality.
