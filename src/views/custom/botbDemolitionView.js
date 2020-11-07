import React from 'react';
import { View, Text } from 'react-native';
import {Style,RadioButtonGroup} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import inRange from '../../services/inrange';
//import getTurn from '../../selectors/turn';


let BotbDemolitionView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            distance: '1',
            results: '',            
            die1: 1
        };
    },
    onChangeDistance(v) {
        this.state.distance = v;
        this.resolve();
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
        let table = this.findTable();
        let dice = this.state.die1;
        let results = table.find((r) => inRange(dice, r.low, r.high)) || {result: ''};
        this.state.results = results.result;
        this.setState(this.state);
    },
    render() {        
        let table = this.findTable();
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
                <View style={{flex:1, paddingTop: 5}}>
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
                <View style={{flex:5, paddingTop: 15}}>
                    <RadioButtonGroup buttons={[
                            {label: 'Enemy 1 hex away', value: '1', fontSize: Style.Font.mediumlarge()}, 
                            {label: 'Enemy 2 hex away', value: '2', fontSize: Style.Font.mediumlarge()},
                            {label: 'Enemy 3 hex away', value: '3', fontSize: Style.Font.mediumlarge()}
                        ]} state={this.state.distance}
                        direction={'vertical'} 
                        onSelected={this.onChangeDistance} 
                    />
                </View>
            </View>
        );
    },
    findTable() {        
        let d = this.state.distance;
        let demo = this.props.battle.custom.demolition || {};
        return demo[d] || [];
    }
});

module.exports = BotbDemolitionView;