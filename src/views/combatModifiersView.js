import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import {Style, SpinNumeric} from 'react-native-nub';

var CombatModifier = React.createClass({
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{marginLeft: 10,fontSize: Style.Font.mediumlarge()}}>{this.props.label}</Text>
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric fontSize={Style.Font.mediumlarge()} value={this.props.attack} min={1} max={500} onChanged={this.props.onChangeAttack} />
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric fontSize={Style.Font.mediumlarge()} value={this.props.defend} min={1} max={500} onChanged={this.props.onChangeDefend} />
                </View>
            </View>
        );
    }
});

var CombatModifiersView = React.createClass({
    onChangeAttack(mod) {
        return (v) => {
            this.props.onChangeAttack && this.props.onChangeAttack(mod, v);
        }
    },
    onChangeDefend(mod) {
        return (v) => {
            this.props.onChangeDefend && this.props.onChangeDefend(mod, v);
        }
    },
    render() {
        return (
            <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Text style={{fontSize: 20, backgroundColor: 'silver', textAlign: 'center'}}>{this.props.label || 'Modifiers'}</Text>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {this.props.modifiers.map((mod,i) => {
                        return (
                            <CombatModifier key={i} label={mod.name}
                                attack={mod.attcount.toString()} onChangeAttack={this.onChangeAttack(mod)}
                                defend={mod.defcount.toString()} onChangeDefend={this.onChangeDefend(mod)}/>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = CombatModifiersView;
