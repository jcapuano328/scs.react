import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import AfbAirStrikesView from './afbAirStrikesView';
import AfbGermanWithdrawalView from './afbGermanWithdrawalView';

var AfbView = React.createClass({
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
                    <AfbAirStrikesView battle={this.props.battle} tabLabel="Air Strikes" />
                    <AfbGermanWithdrawalView battle={this.props.battle} tabLabel="German Withdrawal" />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = AfbView;