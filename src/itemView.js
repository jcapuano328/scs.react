'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
var Current = require('./services/current');

var ItemView = React.createClass({
    getInitialState() {
        return {
            item: this.props.item,
            initialPage: 0
        };
    },
    componentWillMount: function() {
        this.props.events.addListener('menureset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        Current.reset(this.props.item)
        .then((current) => {
            this.props.events.emit('reset');
        })
        .done();
    },
    onChangeTab({i, ref}) {
    },
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView item={this.props.item} events={this.props.events} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}
                >
                    <Text tabLabel="Tab 1" events={this.props.events} />
                    <Text tabLabel="Tab 2" events={this.props.events} />
                    <Text tabLabel="Tab 3" events={this.props.events} />
                    <Text tabLabel="Tab 4" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = ItemView;
