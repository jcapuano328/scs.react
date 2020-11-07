import React from 'react';
import { View } from 'react-native';
import {Style} from 'react-native-nub';
import AfbAirStrikesAvailableView from './afbAirstrikesAvailableView';
import AfbAirStrikesLossView from './afbAirstrikesLossView';


var AfbAirStrikesView = React.createClass({
    render() {        
        return (
            <View style={{flex: 1}}>                
                <View style={{flex:1}}>
                    <AfbAirStrikesAvailableView battle={this.props.battle} />
                </View>
                <View style={{flex:1}}>
                    <AfbAirStrikesLossView battle={this.props.battle} />
                </View>
                <View style={{flex:3}}/>
            </View>
        );
    }
});

module.exports = AfbAirStrikesView;