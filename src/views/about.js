'use strict'
import React from 'react';
import { View, Text, Image, ScrollView, TouchableNativeFeedback, Linking } from 'react-native';
//import {Font} from '../services/style';
import Style from '../services/style';

var About = React.createClass({
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
        if (this.state.width != e.nativeEvent.layout.width /*||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },
    render() {
        //let height = (this.state.height*(this.props.scale||.8)) || 96;
        //let width = (this.state.width*(this.props.scale||.8)) || 96;
        let size = Math.min(this.state.height,this.state.width);
        let height = (size*(this.props.scale||.8)) || 96;
        let width = (size*(this.props.scale||.8)) || 96;

        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                //height: 100,
                //width: 100,
                //backgroundColor: '#ffffff',
                //opacity: 0.25,
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 5,
                marginTop: this.props.marginTop || (Style.Scaling.titleBarHeight + 10),
                margin: 10,
                padding: 5
            }}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:1}} onLayout={this.onLayout}>
                        <Image style={{width: width,height: height,resizeMode: 'stretch'}} source={this.props.logo}/>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',marginLeft: 15}}>{this.props.title}</Text>
                        <Text style={{fontSize: Style.Scaling.fontScale(15),marginLeft: 15}}>{'Version: ' + this.props.version}</Text>
                        <Text style={{fontSize: Style.Scaling.fontScale(15),marginLeft: 15}}>{'Release: ' + this.props.releasedate}</Text>
                    </View>
                </View>
                <View style={{flex: .75}}>
                    <Text style={{fontSize: Style.Font.large()}}>{this.props.description}</Text>
                </View>
                {this.props.credit
                    ? <View style={{flex: 1}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight:'bold'}}>{this.props.credit.description}</Text>
                        {this.props.credit.links.map((c,i) =>
                            //<Text key={i} style={{fontSize: Style.Font.medium()}}>{c.label}</Text>
                            <OpenURLButton key={i} label={c.label} url={c.url} />
                        )}
                    </View>
                    : null
                }
                {this.props.additionalinfo
                    ? <View style={{flex: 1}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight:'bold'}}>{this.props.additionalinfo.description}</Text>
                        {this.props.additionalinfo.links.map((c,i) =>
                            //<Text key={i} style={{fontSize: Style.Font.medium()}}>{c.label}</Text>
                            <OpenURLButton key={i} label={c.label} url={c.url} />
                        )}
                    </View>
                    : null
                }
                <View style={{flex: 1}}>
                    <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight:'bold'}}>{'Built with React Native and these helpful modules'}</Text>
                    <ScrollView                        
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {this.props.dependencies.map((d,i) =>
                            <Text key={i} style={{fontSize: Style.Font.medium()}}>{d.description}</Text>
                        )}                        
                    </ScrollView>                    
                </View>
            </View>
        );
    }
});

var OpenURLButton = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
        url: React.PropTypes.string
    },
    handleClick: function() {
        Linking.canOpenURL(this.props.url)
        .then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            }
        });
    },
    render: function() {
        return (
          <TouchableNativeFeedback onPress={this.handleClick}>
            {/*
              <View style={{padding: 10,backgroundColor: '#3B5998',marginBottom: 10}}>
                  <Text style={{fontSize: Style.Font.medium(), color: 'white'}}>{this.props.label}</Text>
              </View>
            */}
            
              <View style={{padding: 5,marginBottom:2, backgroundColor:'#3B5998',borderColor: 'black',borderWidth: 1,borderRadius:5}}>
                  <Text style={{fontSize: Style.Font.mediumlarge(), color: 'white'}}>{this.props.label}</Text>
              </View>            
          </TouchableNativeFeedback>
      );
    }
});
 

export default About;
