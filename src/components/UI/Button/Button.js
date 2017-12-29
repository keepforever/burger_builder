import React from 'react';

import classes from './Button.css';

const button = ( props ) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;

// {props.children} allows us to use our button like a normal button.
// in this case, {props.children} will just be whatever text

// className={[classes.Button, classes[props.btnType]].join(' ')}
// here, we use join() to output "class1 classtwo class3 ..."
