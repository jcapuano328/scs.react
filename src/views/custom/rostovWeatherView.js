import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import inRange from '../../services/inrange';
//import getTurn from '../../selectors/turn';


let RostovWeatherView = React.createClass({
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
        let table = this.findWxTable();
        let dice = this.state.die1;
        let results = table.find((r) => inRange(dice, r.low, r.high)) || {result: ''};
        this.state.results = results.result;
        this.setState(this.state);
    },
    render() {        
        let table = this.findWxTable();
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:2, justifyContent: 'center', alignItems:'center'}} onLayout={this.onLayout}>
                            <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                        <View style={{flex:3}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                </View>
                <View style={{flex:6, paddingTop: 5}}>
                    <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>{'Results'}</Text>
                    <View style={{padding:10}}>                    
                        {table.map((x,i) => 
                            <View key={i} style={{flexDirection: 'row', justifyContent: 'flex-start', paddingTop:5}}>
                                <View style={{flex:4, alignItems:'flex-start',justifyContent:'flex-start'}}>
                                    <Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold', textAlign: 'left'}}>{x.result}</Text>
                                </View>
                                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold', textAlign: 'center'}}>{x.low}</Text>
                                </View>
                                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold', textAlign: 'center'}}>{x.high}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    },
    findWxTable() {
        // find the entry for the current turn...
        let turn = this.props.turn + 1;
        let table = this.props.battle.custom.weather || []    
        let results = table.find((r) => inRange(turn, r.low, r.high));
        return results ? results.result : [];
    }
});

const mapStateToProps = (state) => ({
    turn: state.current.turn
});

module.exports = connect(
  mapStateToProps
)(RostovWeatherView);
