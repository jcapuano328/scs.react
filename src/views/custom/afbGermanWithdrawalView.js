import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';

let AfbGermanWithdrawalView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            results: '',
            die1: 1
        };
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;        
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        let wd = this.findWDNumber();
        if (this.state.die1 <= wd) {
            this.state.results = 'Withdrawal';
        } else {
            this.state.results = 'NE';
        }
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:3, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                        <View style={{flex:2}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                </View>
                <View style={{flex:6}}/>
            </View>
        );
    },
    findWDNumber() {
        // find the entry for the current turn and player...
        let turn = this.props.turn + 1;        
        let table = this.props.battle.custom.withdrawal || {};
        let wd = table[turn] || 0;
        return wd;
    }
});

const mapStateToProps = (state) => ({
    turn: state.current.turn    
});

module.exports = connect(
  mapStateToProps
)(AfbGermanWithdrawalView);
