import React from 'react';
import { View, Text } from 'react-native';
import {Style,RadioButtonGroup,MultiSelectList} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import CombatModifiersView from '../combatModifiersView';
import inRange from '../../services/inrange';


let BotbBlitzAttackView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            odds:  2,
            attackmods: {},
            defendmods: {},
            results: '',            
            die1: 1
        };
    },
    onChangeOdds(v) {
        this.state.odds = v;
        this.resolve();
    },
    /*
    onChangeAttackMod(m) {        
        this.state.attackmods[m.name] = m.selected;
        this.resolve();        
    },
    onChangeDefendMod(m) {
        this.state.defendmods[m.name] = m.selected;
        this.resolve();        
    },
    */
    onChangeAttackMod(m,v) {        
        let mod = this.state.attackmods[m.name] || 0;
        mod = +v;
        this.state.attackmods[m.name] = mod;
        this.resolve();
    },
    onResetAttackMod(m) {
        Object.keys(this.state.attackmods).forEach((k) => {
            this.state.attackmods[k] = 0;
        });
        this.resolve();
    },
    onChangeDefendMod(m,v) {
        let mod = this.state.defendmods[m.name] || 0;
        mod = +v;
        this.state.defendmods[m.name] = mod;
        this.resolve();
    },
    onResetDefendMod(m) {
        Object.keys(this.state.defendmods).forEach((k) => {
            this.state.defendmods[k] = 0;
        });
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
        // apply modifiers...
        let attackmodifiers = this.props.battle.combatTable.modifiers.filter((m) => m.applies != 'defend' && m.type == 'drm');
        let defendmodifiers = this.props.battle.combatTable.modifiers.filter((m) => m.applies != 'attack' && m.type == 'drm');
        let drm = this.getDRM(this.state.attackmods, attackmodifiers) - this.getDRM(this.state.defendmods, defendmodifiers);
        dice += drm;

        let results = table.find((r) => inRange(dice, r.low, r.high)) || {result: ''};
        this.state.results = results.result;
        this.setState(this.state);
    },
    render() {        
        let table = this.findTable();
        let odds = (this.props.battle.custom.blitzattack || []).map((c) => c.odds);
        let attackmodifiers = this.props.battle.combatTable.modifiers.filter((m) => m.applies != 'defend' && m.type == 'drm');
        let defendmodifiers = this.props.battle.combatTable.modifiers.filter((m) => m.applies != 'attack' && m.type == 'drm');
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
                <View style={{flex:2.25, paddingTop: 5}}>
                    <Text style={{fontSize: Style.Font.mediumlarge(), backgroundColor: 'silver', textAlign: 'center'}}>{'Results'}</Text>
                    <View style={{paddingLeft:10,paddingRight:10}}>
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

                <View style={{flex:0.75, paddingTop: 5}}>
                    <RadioButtonGroup title={'Odds'} labelFontSize={Style.Font.large()} buttons={odds.map((o) => ({"label": o.toString()+'-1', "value": o, "fontSize": Style.Font.mediumlarge()}))} state={this.state.odds} 
                        onSelected={this.onChangeOdds} />
                </View>                
                <View style={{flex:3, paddingTop: 5}}>
                    <View style={{flex: 0.75, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', backgroundColor:'silver'}}>
                            <Text style={{fontSize: Style.Font.large()}}>Attack</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', backgroundColor:'silver'}}>
                            <Text style={{fontSize: Style.Font.large()}}>Defend</Text>
                        </View>
                    </View>
                    <View style={{flex: 4, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', alignSelf:'stretch'}}>
                        <View style={{flex: 1, borderRightWidth: 1}}>
                            {/*
                            <MultiSelectList items={attackmodifiers.map((m) => ({name: m.name, selected: this.state.attackmods[m.name]}))} 
                                itemFontSize={Style.Font.mediumlarge()}
                                onChanged={this.onChangeAttackMod} />                            
                            */}
                            <CombatModifiersView modifiers={attackmodifiers.map((mod) => ({name: mod.name, repeat: mod.repeat, count: (this.state.attackmods[mod.name] || 0)}))}
                                onChange={this.onChangeAttackMod}
                                onReset={this.onResetAttackMod}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            {/*
                            <MultiSelectList items={defendmodifiers.map((m) => ({name: m.name, selected: this.state.defendmods[m.name]}))} 
                                itemFontSize={Style.Font.mediumlarge()}
                                onChanged={this.onChangeDefendMod} />                                                    
                            */}
                            <CombatModifiersView modifiers={defendmodifiers.map((mod) => ({name: mod.name, repeat: mod.repeat, count: (this.state.defendmods[mod.name] || 0)}))}                        
                                onChange={this.onChangeDefendMod}
                                onReset={this.onResetDefendMod}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    },
    findTable() {        
        let odds = this.state.odds;
        let table = this.props.battle.custom.blitzattack || [];        
        let results = table.find((r) => inRange(odds, r.odds, r.odds));
        return results ? results.results : [];
    },
    getDRM(selected, modifiers) {
        let drm = 0;

        Object.keys(selected).forEach((k) => {
            let mod = modifiers.find((m) => m.name == k) || {value:0};
            drm += (selected[k] * mod.value);
        });

        return drm;
    }
});

module.exports = BotbBlitzAttackView;