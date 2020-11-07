import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style,Checkbox} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import getTurn from '../../selectors/turn';

let DopReconstitutionView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            results: '',        
            incommand: false,    
            die1: 1
        };
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    onChangeInCommand(b) {
        this.state.incommand = b;
        this.resolve();
    },
    resolve() {
        let turn = this.props.turn + (this.state.die1 * (this.state.incommand ? 2 : 3));
        let results = getTurn({current: {battle: this.props.battle, turn: turn}});
        this.state.results = results;
        this.setState(this.state);
    },
    render() {
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
                <View style={{flex:6, flexDirection:'row', justifyContent: 'center', alignItems:'flex-start'}}>
                    <Checkbox label={'In Command'} labelFontSize={Style.Font.large()} selected={this.state.incommand} onSelected={this.onChangeInCommand}/>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: state.current.battle,
    turn: state.current.turn
});

module.exports = connect(
  mapStateToProps
)(DopReconstitutionView);

