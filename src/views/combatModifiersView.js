import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import {Style, IconButton, SpinNumeric} from 'react-native-nub';
import Icons from '../res';

var CombatModifier = React.createClass({
    getInitialState() {
        return {
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
    render() {
        let width = this.state.width || 16;
        let height = this.state.height || 32;
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginRight: 5}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{marginLeft: 10,fontSize: Style.Font.mediumlarge()}}>{this.props.label}</Text>
                </View>
                <View style={{flex:0.25, alignItems: 'center', backgroundColor: '#3F51B5', marginLeft: 5, marginRight: 5, marginTop: 20, marginBottom: 20, borderRadius:5}} onLayout={this.onLayout}>
                    <IconButton image={Icons['reset']} width={width} height={height} resizeMode={'contain'} onPress={this.props.onReset}/>
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric fontSize={Style.Font.mediumlarge()} value={this.props.attack} min={0} max={500} onChanged={this.props.onChangeAttack} />
                </View>
                <View style={{flex: 1, marginLeft: 5}}>
                    <SpinNumeric fontSize={Style.Font.mediumlarge()} value={this.props.defend} min={0} max={500} onChanged={this.props.onChangeDefend} />
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
    onReset(mod) {
        return (v) => {
            this.props.onReset && this.props.onReset(mod, v);
        }
    },
    render() {
        return (
            <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Text style={{fontSize: 20, backgroundColor: 'silver', textAlign: 'center'}}>{this.props.label || 'Modifiers'}</Text>
                <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flex:1.1}} />
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: Style.Font.mediumlarge()}}>Attack</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: Style.Font.mediumlarge()}}>Defend</Text>
                    </View>
                </View>
                <View style={{flex:10}}>
                    <ScrollView
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {this.props.modifiers.map((mod,i) => {
                            return (
                                <CombatModifier key={i} label={mod.name}
                                    attack={mod.attcount.toString()} onChangeAttack={this.onChangeAttack(mod)}
                                    defend={mod.defcount.toString()} onChangeDefend={this.onChangeDefend(mod)}
                                    onReset={this.onReset(mod)}/>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }
});

module.exports = CombatModifiersView;
