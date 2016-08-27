'use strict'

var React = require('react');
import { View, Image, Text, Picker } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectList = require('./widgets/selectList');
var CombatModifiersView = require('./combatModifiersView');
var DiceRoll = require('./widgets/diceRoll');
var Dice = require('./services/dice');
var Icons = require('./widgets/icons');
var Current = require('./services/current');
var Combat = require('./services/combat');

let CombatView = React.createClass({
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
            attack: '1',
            defend: '1',
            terrain: battle.terrains[0].name,
            between: battle.terrains[0].name,
            odds: 1,
            mods: {},
            results: ''
        };
        this.buildDice(battle, state);
        return state;
    },
    buildDice(battle, state) {
        this.dice = [];
        Object.keys(this.state||{}).filter((k) => k.startsWith('die')).forEach((k) => delete this.state[k]);
        for (var i=1; i<=battle.combatTable.dice.number; i++) {
            state['die'+i.toString()] = 1;
            this.dice.push({num: 1, low: 1, high: battle.combatTable.dice.sides, color: Dice.dieColor(i)});
        }
    },
    onChangeAttack(v) {
        this.state.attack = v;
        this.resolve();
    },
    onChangeDefend(v) {
        this.state.defend = v;
        this.resolve();
    },
    onChangeTerrain(t) {
        this.state.terrain = t;
        this.resolve();
    },
    onChangeTerrainBetween(t) {
        this.state.between = t;
        this.resolve();
    },
    onChangeOdds(o) {
        this.resolve(o);
    },
    onChangeAttackMod(m,v) {
        let mod = this.state.mods[m.name] || {attack: 0, defend: 0};
        mod.attack = +v;
        this.state.mods[m.name] = mod;
        this.resolve();
    },
    onChangeDefendMod(m,v) {
        let mod = this.state.mods[m.name] || {attack: 0, defend: 0};
        mod.defend = +v;
        this.state.mods[m.name] = mod;
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
    getModifiers(attack) {
        let mods = [];
        Object.keys(this.state.mods).forEach((k) => {
            if (attack && (this.state.mods[k].attack > 0 || this.state.mods[k].defend > 0)) {
                mods.push({
                    name: k,
                    attcount: attack,
                    defcount: defend
                });
            }
        });
        return mods;
    },
    resolve(odds) {
        this.state.odds = odds || Combat.calculate(+this.state.attack,+this.state.defend,this.getModifiers(),this.state.terrain,this.state.between);
        this.state.results = Combat.resolve(this.state.odds,this.getModifiers(),this.state.die1,this.state.die2);
        this.setState(this.state);
    },
    render() {
        let battle = Current.battle();
        let terrain = battle.terrains;
        let b = battle.combatTable;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 4, flexDirection: 'row'}}>
                    <View style={{flex: 3, alignItems: 'center'}}>
                        <View style={{flex: .25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text>Attack</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text>Defend</Text>
                            </View>
                        </View>
                        <View style={{flex: .6, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <SpinNumeric value={this.state.attack} min={1} max={500} onChanged={this.onChangeAttack} />
                            </View>
                            <View style={{flex: 1}}>
                                <SpinNumeric value={this.state.defend} min={1} max={500} onChanged={this.onChangeDefend} />
                            </View>
                        </View>
                        <View style={{flex: 6, alignSelf: 'stretch'}}>
                            <CombatModifiersView modifiers={b.modifiers.map((mod) => {
                                    return {
                                        name: mod.name,
                                        attcount: (this.state.mods[mod.name] || {attack: 0}).attack,
                                        defcount: (this.state.mods[mod.name] || {defend: 0}).defend
                                    };
                                })}
                                onChangeAttack={this.onChangeAttackMod}
                                onChangeDefend={this.onChangeDefendMod}
                            />
                        </View>
                    </View>
                    <View style={{flex: 2, alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignSelf: 'stretch'}}>
                            <SelectList title={'Terrain'} titleonly={true} items={terrain/*.filter((t) => t.combat.attackmod.type || t.combat.defendmod.type)*/.map((t) => t.name)} selected={this.state.terrain} onChanged={this.onChangeTerrain}/>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch'}}>
                            <SelectList title={'Intervening'} titleonly={true} items={terrain/*.filter((t) => t.combat.attackmod.type || t.combat.defendmod.type)*/.map((t) => t.name)} selected={this.state.between} onChanged={this.onChangeTerrainBetween}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <View style={{flex:1, flexDirection: 'row', marginTop: 15}}>
                            <Text style={{flex: 1, fontSize: 16,fontWeight: 'bold', marginLeft: 5, marginTop: 13}}>Odds</Text>
                            <Picker style={{flex: 2, marginRight: 25}}
                                selectedValue={this.state.odds}
                                onValueChange={this.onOddsChanged}
                            >
                                {b.table.map((o,i) => {
                                    let odds = o.odds < 0 ? ('1:'+(-o.odds)) : (o.odds+':1');
                                    return (
                                        <Picker.Item key={i} label={odds} value={o.odds} />
                                    );
                                })}
                            </Picker>
                        </View>
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

module.exports = CombatView;
