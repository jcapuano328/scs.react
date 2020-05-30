import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style,SpinNumeric} from 'react-native-nub';
import Icons from '../res';
import {setVictory} from '../actions/current';

var VictoryPoints = React.createClass({
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
        let iconsize = (Math.min(this.state.height, this.state.width) * 0.9) || 16;        
        return (
            <View style={{flex:1,flexDirection:'row', justifyContent:'center',alignItems:'center', margin:10}} onLayout={this.onLayout}>
                
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width: iconsize,height: iconsize,resizeMode: 'contain'}} source={Icons[this.props.side]}/>
                </View>
                <View style={{flex:1}}/>
                <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                    <SpinNumeric fontSize={Style.Font.large()} value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                
            </View>
        );
    }
});

var VictoryView = React.createClass({
    onSide1VPChanged(v) {
        this.props.setVictory(0, +v);
    },    
    onSide2VPChanged(v) {
        this.props.setVictory(1, +v);        
    },    
    render() {        
        return (
            <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginLeft:30, marginRight:30}}>
                <VictoryPoints side={this.props.battle.players[0]} value={this.props.vp1.toString()} onChanged={this.onSide1VPChanged} />
                <VictoryPoints side={this.props.battle.players[1]} value={this.props.vp2.toString()} onChanged={this.onSide2VPChanged} />
                <View style={{flex:5}} />
            </View>
        );
    }
});


const mapStateToProps = (state) => ({
    vp1: state.current.victory['player1'],
    vp2: state.current.victory['player2']
});

const mapDispatchToProps = ({setVictory});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(VictoryView);