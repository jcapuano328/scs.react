import React from 'react';
import { View, Image, Text } from 'react-native';
import {Style} from 'react-native-nub';
import Icons from '../../res';
import { connect } from 'react-redux';
import {DiceRoll} from 'react-native-dice';
import {setPlayer,setInitiative} from '../../actions/current';
import getPlayer from '../../selectors/player';
import getInitiative from '../../selectors/initiative';

let RostovInitiativeView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'gray', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            results: this.props.player,
            airstrikes: '',
            die1: 1,
            die2: 1,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
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
        if (this.state.die1 > this.state.die2) {
            this.state.results = this.props.battle.players[0];
        } else if (this.state.die2 > this.state.die1) {
            this.state.results = this.props.battle.players[1];
        }
        else {
            this.state.results = this.props.player;
        }        
        this.props.setPlayer(this.state.results);        
        this.props.setInitiative(this.state.results);
        let diff = Math.abs(this.state.die1 - this.state.die2);
        this.state.airstrikes = diff > 0 ? diff.toString() + ' Airstrike(s)' : '';
        this.setState(this.state);
    },
    render() {
        let width = this.state.width || 96;
        let height = this.state.height || 88;

        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:3, justifyContent: 'center', alignItems:'center'}} onLayout={this.onLayout}>
                            <Image style={{width: width,height: height,resizeMode: 'contain'}} source={Icons[this.state.results]}/>
                        </View>
                        <View style={{flex:2, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.state.airstrikes}</Text>
                        </View>
                        <View style={{flex:2}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                </View>
                <View style={{flex:6}}/>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    player: getInitiative(state)
});

const mapDispatchToProps =  ({setPlayer,setInitiative});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(RostovInitiativeView);
