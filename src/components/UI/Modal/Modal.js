import React from 'react';
import classes from './Modal.css';

const modal = ( props ) => (
    <div className={classes.Modal}>
        {props.children}
    </div>
);

export default modal;

// this is a "wrapping component" and we utilze props.children
// to display whatever we wrap with <Modal></Modal> with a specific
// styling or functionality.
