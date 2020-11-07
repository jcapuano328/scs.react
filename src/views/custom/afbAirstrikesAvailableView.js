import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import getPlayer from '../../selectors/player';


let AfbAirStrikesAvailableView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        return {
            results: '',            
            die1: 1,
            die2: 1
        };
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        let numdice = this.findNumDice();
        let dice = 0;  
        if (numdice > 0) {
            dice += this.state.die1;
        }
        if (numdice > 1) {
            dice += this.state.die2;
        }
        this.state.results = dice.toString() + ' Airstrikes';
        this.setState(this.state);
    },
    render() {        
        return (
            <View style={{flex: 1}}>
                <Text style={{fontSize: Style.Font.large(), backgroundColor: 'silver', textAlign: 'center'}}>{'Available'}</Text>
                <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:2, justifyContent: 'center', alignItems:'center'}} onLayout={this.onLayout}>
                            <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                        <View style={{flex:3}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    },
    findNumDice() {
        // find the entry for the current turn and player...
        let turn = this.props.turn + 1;
        let player = this.props.player;                
        let table = (this.props.battle.custom.airstrikes || {})[player] || {};
        let dice = table[turn] || 0;
        return dice;
    }
});

const mapStateToProps = (state) => ({
    turn: state.current.turn,
    player: getPlayer(state)
});

module.exports = connect(
  mapStateToProps
)(AfbAirStrikesAvailableView);
