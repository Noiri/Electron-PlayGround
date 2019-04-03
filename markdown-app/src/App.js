import React, { Component } from 'react';
import InputField from './InputField';
import Markdown from './Markdown';
import styles from './App.module.css';

class App extends Component{
    constructor(props){
        super(props);

        this.state ={
            markdown: ""
        };

        this.updateMarkdown = this.updateMarkdown.bind(this);
    }

    updateMarkdown(markdown){
        this.setState({
            markdown: markdown
        });
    }

    render() {
        return (
            <div className={styles.App}>
                <InputField onChange_setState={this.updateMarkdown} />
                <Markdown markdown={this.state.markdown} />
            </div>
        );
    }
}

export default App;