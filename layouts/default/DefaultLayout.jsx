import React, { Component } from 'react';

import { Text, StatusBar, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking, ScrollView } from 'react-native';

import BackLeft from '../../components/BackLeftComponent';

import Footer from '../../components/FooterComponent';

import Preloader from '../../components/PreloaderComponent';

class LayoutDefault extends Component{
  constructor(props){
    super(props);

    this.state={
      heightParent: "",
      loading: true
    };
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 200);
  }

  render(){
    return(
      <View style={[{flex: 1, flexDirection: 'column'}, {}]}>
        <StatusBar backgroundColor='#2CAEE6' barStyle='light-content' />
        {
        (this.props.backleft != undefined && this.props.backleft == false) ? null
        : (<BackLeft name={this.props.name} icon={this.props.icon} />)
        }
        <View style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} onLayout={(event) => this.setState({heightParent: event.nativeEvent.layout.height})}>
          {
          (this.props.loading!=undefined ? this.props.loading : this.state.loading) ? (function(){
            const return_ = (
              <View style={{display: 'flex', flex: 1}}>
                <Preloader/>

                <Footer/>
              </View>
            );

            return return_
          })() :
          (function(this_, styles_){
            const return_ = (
              <ScrollView removeClippedSubviews={true} style={{display: 'flex'}} ref={ (scroll_view) => { this_.scroll_view = scroll_view } }>
                <View style={[styles_.childrenScrollView, {minHeight: this_.state.heightParent!="" ? this_.state.heightParent : null}]}>
                  <View style={styles_.container}>
                    <View>
                      <Text>{this_.props.title}</Text>
                    </View>

                    <View style={(this_.props.container != undefined && this_.props.container == false) ? [{}, styles_.parentContainer] : [styles_.propParentContainer, styles_.parentContainer]}>
                      {
                        this_.props.children
                      }
                    </View>
                  </View>

                  {
                  (!this_.props.footer && this_.props.footer == false) ? null
                  : (<Footer/>)
                  }
                </View>
              </ScrollView>        
            );

            return return_;
          })(this, styles)
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  childrenScrollView:{
    display: 'flex',
  },
  container:{
    padding: 10
  },
  loading: {
    flex: 1
  },
  parentContainer: {
    display: 'flex',
    flex: 1,
  },
  propParentContainer:{
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 10
  }
});

export default LayoutDefault;