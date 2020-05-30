import React from 'react';
import { View, Text } from 'react-native';
import {Style,MultiSelectList} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import inRange from '../../services/inrange';
import Modifier from '../../services/modifier';


let FsjAirLandingView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'black', dotcolor:'red'},
        {num: 1, low: 1, high: 6, color: 'black', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            results: '',
            mods: {},
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1
        };
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
        this.state.die4 = d[3].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    onChangeMods(m) {
        this.state.mods[m.name] = m.selected;
        this.resolve();
    },
    getModifier() {
        let mods = [];
        let modifiers = this.props.battle.custom.airLanding.modifiers || [];
        Object.keys(this.state.mods).forEach((k) => {            
            let m = modifiers.find((mod) => mod.name == k);
            if (m) { mods.push({...m, count: 1});}
        });
        return Modifier.modifyDRM(mods);
    },
    resolve() {
        let table = this.props.battle.custom.airLanding.table || [];
        let dice = this.state.die1 + this.getModifier();
        let results = table.find((r) => inRange(dice, r.low, r.high)) || {result: ''};
        this.state.results = results.result;
        if (results.result.indexOf('Scatter') > -1) {
            let scatter = ': Dir ' + this.state.die2.toString() + ', Dist ' + (this.state.die3+this.state.die4).toString();
            this.state.results += scatter;
        }
        this.setState(this.state);
    },
    render() {
        let table = this.props.battle.custom.airLanding.table || [];
        let modifiers = this.props.battle.custom.airLanding.modifiers || [];
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:2, justifyContent: 'center', alignItems:'center'}} onLayout={this.onLayout}>
                            <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                        <View style={{flex:3}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                </View>
                <View style={{flex:6, flexDirection:'row'}}>
                        <View style={{flex:3, borderRightWidth: 1, borderRightColor: 'gray'}}>
                            <MultiSelectList title={'Modifiers'} 
                                labelFontSize={Style.Font.mediumlarge()}
                                items={modifiers.map((m) => {return {name: m.name, selected: this.state.mods[m.name],fontSize:Style.Font.mediumlarge()};})} onChanged={this.onChangeMods}
                            />
                        </View>
                        <View style={{flex:2, justifyContent: 'flex-start'}}>
                            <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>{'Results'}</Text>
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
    nationalities() {        
        return Object.keys(Tables);
    }
});

module.exports = FsjAirLandingView;
