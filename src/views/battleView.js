import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import TurnView from './turnView';
import BarrageView from './barrageView';
import CombatView from './combatView';
import VictoryView from './victoryView';
import FsjView from './custom/fsjView';
import TmeView from './custom/tmeView';
import RostovView from './custom/rostovView';
import DopView from './custom/dopView';
import BotbView from './custom/botbView';
import AfbView from './custom/afbView';
import getGame from '../selectors/game';

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44),backgroundColor: 'rgba(0,0,0,0.01)'}}>            
                <TurnView logo={this.props.battle.image} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.large()}}
                    initialPage={this.state.initialPage}
                >
                    {this.props.battle.custom ? this.customView(this.props.battle.custom) : null}
                    {this.props.battle.barrageTable ? <BarrageView battle={this.props.battle} tabLabel="Barrage" /> : null}
                    {this.props.battle.combatTable ? <CombatView battle={this.props.battle} tabLabel="Combat" /> : null}
                    <VictoryView battle={this.props.battle} tabLabel="Victory" />
                </ScrollableTabView>
            </View>
        );
    },
    customView(custom) {
        /*
        const TagName = custom.view;
        return (
            <TagName battle={this.props.battle} tabLabel={custom.label||'Custom'} />
        );
        */
      let TagName = null;
      switch(custom.view) {
        case 'FsjView':
            TagName = FsjView;
            break;
        case 'TmeView':
            TagName = TmeView;
             break;
        case 'RostovView':
            TagName = RostovView;
             break;
        case 'DopView':
            TagName = DopView;
            break;
        case 'BotbView':
            TagName = BotbView;
            break;
        case 'AfbView':
            TagName = AfbView;
            break;
    
        }
      return (
        <TagName battle={this.props.battle} tabLabel={custom.label||'Custom'} />
      );      
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(BattleView);
