import React from 'react';
import classes from './Input.css';
// we expect get attributes you wish to set on an input
// as props.  Then we can use the spread operator to distribute
// them on whatever element that the switch statement yeilds.
// to avoid an error, we switch the casing on switch (props.inputType) this
// property "inputType".  It must be "inputtype".  This adjustment also needs
// to be made in the ContactData component whilst passing in props.
// with the "new" advanced setup of our input elements, we refine the props
// to be distributed into the input elements within the switch statement
// to only distribut props.elementConfig.  Need to add an onChange listener
// to respond when user types or makes a drop-down selection.

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    // here we need to push the class conditionally and making sure to be
    // mindful of css modules unique mutation of the class.
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}/>
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}/>
            break;
        case ('select'):
        // option.value refers to value property in individual option object
        // that sits in the select elements config options array
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;

// old Component Code before we adjusted the state in the ContactData
// Component to output code dynamically.

// const input = ( props ) => {
//     let inputElement = null;
//
//     switch (props.inputType) {
//         case ('input'):
//             inputElement = <input className={classes.InputElement} {...props}/>
//             break;
//         case ('textarea'):
//             inputElement = <textarea className={classes.InputElement} {...props}/>
//             break;
//         default:
//             inputElement = <input className={classes.InputElement} {...props} />
//
//     }
//
//     return (
//         <div className={classes.Input}>
//             <label className={classes.Label}>{props.label}</label>
//             {inputElement}
//         </div>
//     );
//
// };
// Before adding input validation dynamic classes.
// const input = ( props ) => {
//     let inputElement = null;
//
//
//     switch (props.elementType) {
//         case ('input'):
//             inputElement = <input
//                 className={classes.InputElement}
//                 value={props.value}
//                 onChange={props.changed}
//                 {...props.elementConfig}/>
//             break;
//         case ('textarea'):
//             inputElement = <textarea
//                 className={classes.InputElement}
//                 value={props.value}
//                 onChange={props.changed}
//                 {...props.elementConfig}/>
//             break;
//         case ('select'):
//         // option.value refers to value property in individual option object
//         // that sits in the select elements config options array
//             inputElement = (
//                 <select
//                     className={classes.InputElement}
//                     value={props.value}
//                     onChange={props.changed}>
//                     {props.elementConfig.options.map(option => (
//                         <option value={option.value} key={option.value}>
//                             {option.displayValue}
//                         </option>
//                     ))}
//                 </select>
//             );
//             break;
//
//         default:
//             inputElement = <input
//                 className={classes.InputElement}
//                 value={props.value}
//                 onChange={props.changed}
//                 {...props.elementConfig}/>
//     }
//
//     return (
//         <div className={classes.Input}>
//             <label className={classes.Label}>{props.label}</label>
//             {inputElement}
//         </div>
//     );
//
// };
//
// export default input;
