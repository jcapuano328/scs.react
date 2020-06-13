import React from 'react';
import { View, Text } from 'react-native';
import {Style} from 'react-native-nub';
import { connect } from 'react-redux';
import {DiceRoll} from 'react-native-dice';
import getTurn from '../../selectors/turnNumber';
import inRange from '../../services/inrange';

let TmeAirSupportView = React.createClass({
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
        let turn = this.props.turn;
        let table = (this.props.battle.custom.airSupport.find((r) => inRange(turn, r.low, r.high)) || {result: []}).result;
        let dice = this.state.die1 + this.state.die2;
        let results = table.find((r) => inRange(dice, r.low, r.high)) || {result: ''};
        this.state.results = results.result;
        this.setState(this.state);
    },
    render() {
        let turn = this.props.turn;
        let table = (this.props.battle.custom.airSupport.find((r) => inRange(turn, r.low, r.high)) || {result: []}).result;
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:3, justifyContent: 'center', alignItems:'center'}} onLayout={this.onLayout}>
                            <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                        <View style={{flex:2}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                </View>
                <View style={{flex:6, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'silver'}}>
                            <View style={{flex:4, alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize: Style.Font.mediumlarge(), textAlign: 'center'}}>{'Results'}</Text>                                
                            </View>
                            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize: Style.Font.mediumlarge(), textAlign: 'center'}}>{'Low'}</Text>                                
                            </View>
                            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize: Style.Font.mediumlarge(), textAlign: 'center'}}>{'High'}</Text>
                            </View>
                        </View>                        
                        {table.map((x,i) => 
                            <View key={i} style={{flexDirection: 'row', justifyContent: 'flex-start', paddingTop:5}}>
                                <View style={{flex:4, alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{x.result}</Text>
                                </View>
                                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{x.low}</Text>
                                </View>
                                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{x.high}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    turn: getTurn(state)
});

module.exports = connect(
  mapStateToProps
)(TmeAirSupportView);
