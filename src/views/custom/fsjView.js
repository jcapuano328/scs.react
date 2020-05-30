import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import FsjAirSupportView from './fsjAirSupportView';
import FsjAntiAirView from './fsjAntiAirView';
import FsjAirLandingView from './fsjAirLandingView';
import FsjBarrageLossView from './fsjBarrageLossView';

var FsjView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44),backgroundColor: 'rgba(0,0,0,0.01)'}}>                
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.large()}}
                    initialPage={this.state.initialPage}
                >
                    <FsjAirSupportView battle={this.props.battle} tabLabel="Air Support" />
                    <FsjAntiAirView battle={this.props.battle} tabLabel="Anti Air" />                    
                    <FsjAirLandingView battle={this.props.battle} tabLabel="Air Landing" />                    
                    <FsjBarrageLossView battle={this.props.battle} tabLabel="Barrage Loss" />                    
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = FsjView;