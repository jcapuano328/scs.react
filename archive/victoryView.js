'use strict'

var React = require('react');
import { View, Text } from 'react-native';
import {SpinNumeric} from 'react-native-app-nub';
var Current = require('./services/current');

let VictoryView = React.createClass({
    getInitialState() {
        let v = Current.victory();
        return {
            player1: v.player1.toString(),
            player2: v.player2.toString()
        };
    },
    componentDidMount: function() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        Current.victory({player1: 0,player2: 0});
        Current.save()
        .then(() => {
            this.setState({player1: '0',player2: '0'});
        });
    },
    onChangePlayer1(v) {
        Current.victory({player1: +v,player2: +this.state.player2});
        Current.save()
        .then(() => {
            this.setState({player1: v,player2: this.state.player2});
        });
    },
    onChangePlayer2(v) {
        Current.victory({player1: +this.state.player1,player2: +v});
        Current.save()
        .then(() => {
            this.setState({player1: this.state.player1,player2: v});
        });
    },
    render() {
        let battle = Current.battle();
        return (
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginTop: 30}}>{battle.players[0]}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <SpinNumeric value={this.state.player1} min={0} max={500} onChanged={this.onChangePlayer1} />
                    </View>
                    <View style={{flex:1}}/>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginTop: 30}}>{battle.players[1]}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <SpinNumeric value={this.state.player2} min={0} max={500} onChanged={this.onChangePlayer2} />
                    </View>
                    <View style={{flex:1}}/>
                </View>
                <View style={{flex:6}}/>
            </View>
        );
    }
});

module.exports = VictoryView;
