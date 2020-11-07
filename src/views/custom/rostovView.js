import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import RostovWeatherView from './rostovWeatherView';
import RostovInitiativeView from './rostovInitiativeView';
import RostovReconstructionView from './rostovReconstructionView';

var RostovView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        return (
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.01)'}}>                
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.large()}}
                    initialPage={this.state.initialPage}
                >
                    <RostovWeatherView battle={this.props.battle} tabLabel="Weather" />
                    <RostovInitiativeView battle={this.props.battle} tabLabel="Initiative" />
                    <RostovReconstructionView battle={this.props.battle} tabLabel="Reconstruction" />                    
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = RostovView;