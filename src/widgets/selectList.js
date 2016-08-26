'use strict';

var React = require('react');
import { View, Text, ScrollView } from 'react-native';
var Checkbox = require('./checkbox');

var SelectList = React.createClass({
    onSelected(item) {
        return (b) => {            
            this.props.onChanged && this.props.onChanged(b ? item : '');
        }
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{fontSize: 20, backgroundColor: 'silver', textAlign: 'center'}}>{this.props.selected || this.props.title}</Text>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {this.props.items.map((item,i) => {
                        return (
                            <Checkbox key={i} label={item} selected={this.props.selected==item} onSelected={this.onSelected(item)}/>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = SelectList;
