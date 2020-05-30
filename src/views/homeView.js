import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Landing} from 'react-native-nub';
import {splash} from '../res';
import getGame from '../selectors/game';            

var HomeView = React.createClass({
    componentDidUpdate() {        
        if (this.props.battle && this.props.battle.title) {
            Actions.battle({title: this.props.battle.title, subtitle: this.props.battle.desc});
        }
    },
    render() {                
        return (            
            <Landing splash={splash} />
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(HomeView);
