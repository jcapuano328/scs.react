import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import BotbCommandoView from './botbCommandoView';
import BotbDemolitionView from './botbDemolitionView';
import BotbBlitzAttackView from './botbBlitzAttackView';

var BotbView = React.createClass({
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
                    <BotbCommandoView battle={this.props.battle} tabLabel="Commando" />
                    <BotbDemolitionView battle={this.props.battle} tabLabel="Demolition" />
                    <BotbBlitzAttackView battle={this.props.battle} tabLabel="Blitz Attack" />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = BotbView;