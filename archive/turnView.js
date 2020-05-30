'use strict'

var React = require('react');
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {SpinSelect} from 'react-native-app-nub';
var Icons = require('./res/icons');
var Current = require('./services/current');

var TurnView = React.createClass({
    getInitialState() {
        return {
            turn: Current.turn(),
            phase: Current.phase()
        };
    },
    componentDidMount: function() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({turn: Current.turn(), phase: Current.phase()});
    },
    onPrevTurn() {
        //console.log('previous turn');
        Current.prevTurn(true)
        .then((turn) => {
            this.setState({turn: turn});
        })
        .done();
    },
    onNextTurn() {
        //console.log('next turn');
        Current.nextTurn(true)
        .then((turn) => {
            this.setState({turn: turn});
        })
        .done();
    },
    onPrevPhase() {
        //console.log('previous phase');
        Current.prevPhase()
        .then((phase) => {
            this.setState({turn: Current.turn(), phase: phase});
        })
        .done();
    },
    onNextPhase() {
        //console.log('next phase');
        Current.nextPhase()
        .then((phase) => {
            this.setState({turn: Current.turn(), phase: phase});
        })
        .done();
    },
    render() {
        return (
            <View style={{flexDirection: 'row', height: 90, marginTop: 60, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1}}>
                    <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={Icons[Current.battle().image]}/>
                </View>
                <View style={{flex: 5}}>
                    <SpinSelect value={this.state.turn} onPrev={this.onPrevTurn} onNext={this.onNextTurn} />
                    <SpinSelect value={this.state.phase} onPrev={this.onPrevPhase} onNext={this.onNextPhase} />
                </View>
            </View>
        );
    }
});

module.exports = TurnView;
