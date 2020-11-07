import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import DopForceMarchView from './dopForceMarchView';
import DopReconstitutionView from './dopReconstitutionView';

var DopView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>                
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.large()}}
                    initialPage={this.state.initialPage}
                >                    
                    <DopForceMarchView battle={this.props.battle} tabLabel="Force March" />
                    <DopReconstitutionView battle={this.props.battle} tabLabel="Reconstitution" />                    
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = DopView;