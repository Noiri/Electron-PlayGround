import React, { Component } from 'react';
//import { marked } from 'marked';
var marked = require('marked');

class Markdown extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        var html = marked(this.props.markdown);
        return(
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        );
    }
}

export default Markdown;