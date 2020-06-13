import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import TmeAirSupportView from './tmeAirSupportView';
import TmeAirDropView from './tmeAirDropView';
import TmeInvasionView from './tmeInvasionView';

var TmeView = React.createClass({
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
                    <TmeAirSupportView battle={this.props.battle} tabLabel="Air Support" />
                    <TmeAirDropView battle={this.props.battle} tabLabel="Air Drop" />
                    <TmeInvasionView battle={this.props.battle} tabLabel="Invasion" />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = TmeView;