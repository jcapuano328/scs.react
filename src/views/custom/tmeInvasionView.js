import React from 'react';
import { View, Text } from 'react-native';
import {Style,RadioButtonGroup} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import inRange from '../../services/inrange';

let TmeInvasionView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        let terrains = this.terrains();
        return {
            terrain: terrains[0],
            results: '',
            die1: 1,
            die2: 1
        };
    },
    onTerrainChanged(v) {
        this.state.terrain = v;
        this.resolve();
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
        let table = this.props.battle.custom.invasion[this.state.terrain] || [];
        let dice = this.state.die1 + this.state.die2;
        let results = table.find((r) => inRange(dice, r.low, r.high)) || {result: ''};
        this.state.results = results.result;
        this.setState(this.state);
    },
    render() {
        let table = this.props.battle.custom.invasion[this.state.terrain] || [];
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
                        <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                            <RadioButtonGroup title={'Terrain'} labelFontSize={Style.Font.mediumlarge()} direction={'vertical'}
                                buttons={this.terrains().map((n) => ({label:n,value:n, fontSize: Style.Font.fontScale(18)}))}
                                state={this.state.terrain}
                                onSelected={this.onTerrainChanged}/>
                        </View>
                        <View style={{flex:2, justifyContent: 'flex-start'}}>
                            <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>{'Results'}</Text>
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
    },
    terrains() {        
        return Object.keys(this.props.battle.custom.invasion);
    }
});

module.exports = TmeInvasionView;
