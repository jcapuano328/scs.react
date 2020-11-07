import React from 'react';
import { View, Text } from 'react-native';
import {Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';

let RostovReconstructionView = React.createClass({
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
        if (this.state.die1 < 4) {
            this.state.results = 'Re-enter in ' + this.state.die1.toString() + ' turn(s)';
        } else {
            this.state.results = 'Permanently remove';
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
    }
});

module.exports = RostovReconstructionView;