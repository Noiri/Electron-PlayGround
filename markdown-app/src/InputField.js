import React, { Component } from 'react';
import styles from './InputField.module.css';


class InputField extends Component {
    constructor(props){
        super(props);
        this.__onChange = this.__onChange.bind(this);
    }

    __onChange(e) {
        this.props.onChange_setState(e.target.value);
    }

    render(){
        return(
            <textarea className={styles.input_form} onChange={this.__onChange}></textarea>
        );
    }
}

export default InputField;