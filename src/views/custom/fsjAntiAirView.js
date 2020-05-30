import React from 'react';
import { View, Text } from 'react-native';
import {Style,RadioButtonGroup} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import inRange from '../../services/inrange';

let FsjAntiAirView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, color: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'black', dotcolor:'red'},
        {num: 1, low: 1, high: 6, color: 'black', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            aarating: 1,
            results: '',
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1
        };
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
        this.state.die4 = d[3].value;
        this.state.die5 = d[4].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    onAARatingChanged(v) {
        this.state.aarating = +v;
        this.resolve();
    },
    resolve() {
        let table = this.props.battle.custom.antiAir.table || [];
        let lossTable = this.props.battle.custom.antiAir.lossTable || [];
        let results = '';
        if (this.state.die1 <= this.state.aarating) {
            //results = table[0].result;
            let dice = this.state.die2;
            let lossresults = lossTable.find((r) => inRange(dice, r.low, r.high)) || {result: ''};
            results = lossresults.result + '\r\n' + 'Scatter: Dir ' + this.state.die3.toString() + ', Dist ' + (this.state.die4+this.state.die5).toString();
        } else {
            results = table[1].result;
        }

        this.state.results = results;
        this.setState(this.state);
    },
    render() {
        let table = this.props.battle.custom.antiAir.table || [];
        let lossTable = this.props.battle.custom.antiAir.lossTable || [];
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:2, justifyContent: 'center', alignItems:'center'}} onLayout={this.onLayout}>
                            <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                        <View style={{flex:3}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                </View>
                <View style={{flex:6, flexDirection:'row'}}>
                        <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                            <RadioButtonGroup title={'AA Rating'} labelFontSize={Style.Font.mediumlarge()} direction={'vertical'}
                                buttons={[1,2,3,4].map((n) => ({label:n,value:n, fontSize: Style.Font.fontScale(18)}))}
                                state={this.state.aarating}
                                onSelected={this.onAARatingChanged}/>

                        </View>
                        <View style={{flex:4, justifyContent: 'flex-start'}}>
                            <View style={{flex:2}}>
                                <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>{'Results'}</Text>
                                {table.map((x,i) => 
                                    <View key={i} style={{flexDirection: 'row', justifyContent: 'flex-start', paddingTop:5}}>
                                        <View style={{flex:2, alignItems:'center',justifyContent:'center'}}>
                                            <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{x.dice}</Text>
                                        </View>
                                        <View style={{flex:3, alignItems:'center',justifyContent:'center'}}>
                                          <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{x.result}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>

                            <View style={{flex:3, justifyContent: 'flex-start'}}>
                                <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>{'Losses'}</Text>
                                {lossTable.map((x,i) => 
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
            </View>
        );
    },
    nationalities() {        
        return Object.keys(this.props.battle.custom.airSupport);
    }
});

module.exports = FsjAntiAirView;
