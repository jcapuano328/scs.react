'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
var Current = require('./services/current');

var ItemView = React.createClass({
    getInitialState() {
        return {
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
                    <Text tabLabel="Barrage" events={this.props.events} />
                    <Text tabLabel="Combat" events={this.props.events} />
                    <Text tabLabel="Victory" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = ItemView;
