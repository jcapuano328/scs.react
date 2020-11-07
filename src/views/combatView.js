import React from 'react';
import { View, Image, Text, Picker } from 'react-native';
import {Style,SpinNumeric,RadioButtonGroup,SelectList} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import CombatModifiersView from './combatModifiersView';
import Dice from '../services/dice';
import Combat from '../services/combat';

let CombatView = React.createClass({
    dice: [],
    getInitialState() {
        return this.buildInitialState();
    },
    buildInitialState() {
        let battle = this.props.battle;
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
            this.dice.push({num: 1, low: 1, high: battle.combatTable.dice.sides, color: Dice.dieColor(i), dotcolor: Dice.dotColor(i)});
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
        this.state.terrain = t || this.state.terrain;
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
    onResetAttackMod(m) {
        Object.keys(this.state.mods).forEach((k) => {
            this.state.mods[k].attack = 0;
        });
        this.resolve();
    },
    onChangeDefendMod(m,v) {
        let mod = this.state.mods[m.name] || {attack: 0, defend: 0};
        mod.defend = +v;
        this.state.mods[m.name] = mod;
        this.resolve();
    },
    onResetDefendMod(m) {
        Object.keys(this.state.mods).forEach((k) => {
            this.state.mods[k].defend = 0;
        });
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
            if (this.state.mods[k].attack > 0 || this.state.mods[k].defend > 0) {
                mods.push({
                    name: k,
                    attcount: this.state.mods[k].attack,
                    defcount: this.state.mods[k].defend
                });
            }
        });
        return mods;
    },
    resolve(odds) {
        let battle = this.props.battle;
        let rules = {combatTable: this.props.battle.combatTable, terrains: this.props.battle.terrains};        
        this.state.odds = odds || Combat.calculate(+this.state.attack,+this.state.defend,this.getModifiers(),this.state.terrain,this.state.between,rules);
        this.state.results = Combat.resolve(this.state.odds,this.getModifiers(),this.state.terrain,this.state.between,this.state.die1,this.state.die2,rules);
        this.setState(this.state);
    },
    render() {
        let battle = this.props.battle;
        let terrain = battle.terrains;
        let b = battle.combatTable;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', paddingTop: 4, paddingBottom: 4}}>
                    <View style={{flex:3, flexDirection: 'row', marginTop: 15}}>
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
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        {Icons[this.state.results.toUpperCase()]
                            ? <Image style={{marginTop: 13, height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[this.state.results.toUpperCase()]} />
                            : <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                        }
                    </View>
                    <View style={{flex: 2, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={this.dice.map((d,i) => this.state['die'+(i+1)])}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>
                </View>

                <View style={{flex: 8}}>
                    <View style={{flex: 3}}>
                        <View style={{flex: 0.75, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center', backgroundColor:'silver'}}>
                                <Text style={{fontSize: Style.Font.large()}}>Attack</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'center', backgroundColor:'silver'}}>
                                <Text style={{fontSize: Style.Font.large()}}>Defend</Text>
                            </View>
                        </View>
                        <View style={{flex: 8, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', alignSelf:'stretch'}}>
                            <View style={{flex: 1, borderRightWidth: 1}}>
                                <View style={{flex: 1}}>
                                    <SpinNumeric fontSize={Style.Font.mediumlarge()} value={this.state.attack} min={1} max={500} onChanged={this.onChangeAttack} />
                                </View>
                                <View style={{flex: 4, alignSelf: 'stretch'}}>
                                    <CombatModifiersView modifiers={b.modifiers.filter((mod) => !mod.applies || mod.applies != "defend").map((mod) => {
                                            return {
                                                name: mod.name,
                                                count: (this.state.mods[mod.name] || {attack: 0}).attack,
                                                repeat: mod.repeat
                                            };
                                        })}
                                        onChange={this.onChangeAttackMod}
                                        onReset={this.onResetAttackMod}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 1}}>
                                <View style={{flex: 1}}>
                                    <SpinNumeric fontSize={Style.Font.mediumlarge()} value={this.state.defend} min={1} max={500} onChanged={this.onChangeDefend} />
                                </View>
                                <View style={{flex: 4, alignSelf: 'stretch'}}>
                                    <CombatModifiersView modifiers={b.modifiers.filter((mod) => !mod.applies || mod.applies != "attack").map((mod) => {
                                            return {
                                                name: mod.name,
                                                count: (this.state.mods[mod.name] || {defend: 0}).defend, 
                                                repeat: mod.repeat
                                            };
                                        })}
                                        onChange={this.onChangeDefendMod}
                                        onReset={this.onResetDefendMod}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 2, alignItems: 'center', alignSelf: 'stretch', flexDirection: 'row'}}>
                        <View style={{flex: 1, alignSelf: 'stretch', borderRightWidth: 1}}>
                            <SelectList title={'Terrain'} 
                                titleonly={true} 
                                titleFontSize={Style.Font.large()}
                                itemFontSize={Style.Font.mediumlarge()}
                                items={terrain.filter((t) => !t.type || t.type != "intervening").map((t) => t.name)} 
                                selected={this.state.terrain} 
                                onChanged={this.onChangeTerrain}/>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch'}}>
                            <SelectList title={'Intervening'} 
                                titleonly={true} 
                                titleFontSize={Style.Font.large()}
                                itemFontSize={Style.Font.mediumlarge()}
                                items={terrain.filter((t) => !t.type || t.type == "intervening").map((t) => t.name)} 
                                selected={this.state.between} 
                                onChanged={this.onChangeTerrainBetween}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = CombatView;
