'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
import {SelectList,MultiSelectList} from 'react-native-app-nub';
import {DiceRoll} from 'react-native-dice';
var Dice = require('./services/dice');
var Icons = require('./res/icons');
var Current = require('./services/current');
var Barrage = require('./services/barrage');

let BarrageView = React.createClass({
    dice: [],
    getInitialState() {
        return this.buildInitialState();
    },
    componentDidMount: function() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState(this.buildInitialState());
    },
    buildInitialState() {
        let battle = Current.battle();
        let state = {
            strength: battle.barrageTable.table[0].strength,
            terrain: battle.terrains[0].name,
            mods: {},
            results: ''
        };
        this.buildDice(battle, state);
        return state;
    },
    buildDice(battle, state) {
        this.dice = [];
        Object.keys(this.state||{}).filter((k) => k.startsWith('die')).forEach((k) => delete this.state[k]);
        for (var i=1; i<=battle.barrageTable.dice.number; i++) {
            state['die'+i.toString()] = 1;
            this.dice.push({num: 1, low: 1, high: battle.barrageTable.dice.sides, color: Dice.dieColor(i), dotcolor: Dice.dotColor(i)});
        }
    },
    onChangeStrength(v) {
        this.state.strength = v;
        this.resolve();
    },
    onChangeTerrain(t) {
        this.state.terrain = t;
        this.resolve();
    },
    onChangeMods(m) {
        this.state.mods[m.name] = m.selected;
        this.resolve();
    },
    onDiceRoll(d) {
        d.forEach((die,i) => this.state['die'+(i+1)] = die.value);
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    getModifiers() {
        let mods = [];
        Object.keys(this.state.mods).forEach((k) => {
            if (this.state.mods[k]) {
                mods.push(k);
            }
        });
        return mods;
    },
    resolve() {
        this.state.results = Barrage.resolve(this.state.strength,this.state.terrain,this.getModifiers(),this.state.die1,this.state.die2);
        this.setState(this.state);
    },
    render() {
        let battle = Current.battle();
        let terrain = battle.terrains;
        let b = battle.barrageTable;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 4, flexDirection: 'row'}}>
                    <View style={{flex: 0.75, alignItems: 'flex-start'}}>
                        <SelectList title={'Strength'} titleonly={true} items={b.table.map((t) => t.strength)} selected={this.state.strength} onChanged={this.onChangeStrength}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <SelectList title={'Terrain'} titleonly={true} items={terrain/*.filter((t) => t.barrage.attackmod.type || t.barrage.defendmod.type)*/.map((t) => t.name)} selected={this.state.terrain} onChanged={this.onChangeTerrain}/>
                    </View>
                    <View style={{flex: 1}}>
                        <MultiSelectList title={'Modifiers'} items={b.modifiers.map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})} onChanged={this.onChangeMods}/>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            {Icons[this.state.results.toUpperCase()]
                                ? <Image style={{marginTop: 13, height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[this.state.results.toUpperCase()]} />
                                : <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                            }
                        </View>
                        <View style={{flex: 2, marginRight: 15}}>
                            <DiceRoll dice={this.dice} values={this.dice.map((d,i) => this.state['die'+(i+1)])}
                                onRoll={this.onDiceRoll}
                                onDie={this.onDieChanged} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = BarrageView;
