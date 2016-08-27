'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
var BarrageView = require('./barrageView');
var CombatView = require('./combatView');
var Current = require('./services/current');

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 1
        };
    },
    componentWillMount: function() {
        this.props.events.addListener('menureset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        Current.reset(Current.battle())
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
                <TurnView events={this.props.events} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}
                >
                    <BarrageView tabLabel="Barrage" events={this.props.events} />
                    <CombatView tabLabel="Combat" events={this.props.events} />
                    <Text tabLabel="Victory" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = BattleView;
