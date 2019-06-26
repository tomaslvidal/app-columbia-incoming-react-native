import React, { Component } from 'react';

import { connect } from 'react-redux';

// import { isSignedIn } from 'ColumbiaIncoming/auth';

import { Text, View, Alert, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';

import CollapsibleList from 'react-native-collapsible-list'

import Div from 'ColumbiaIncoming/layouts/default';

import Panel from 'ColumbiaIncoming/components/PanelComponent';

import MultiSelect from 'ColumbiaIncoming/components/MultiSelectComponent';

import * as t from 'tcomb-form-native'

import axios from 'axios';

import _ from 'lodash';

const Form = t.form.Form;

const stylesheet = _.cloneDeep(Form.stylesheet);

stylesheet.controlLabel.normal = {
  color: '#343434',
  fontSize: 15,
  fontWeight: 'bold',
}

stylesheet.select.normal = {
  color: undefined,
}

stylesheet.textbox.normal.color = 'black';

const colorError = '#E44545';

stylesheet.controlLabel.error.color = colorError;

stylesheet.helpBlock.error.color = colorError;

class SurveysContainer extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      run: false,
      loading: false,
      state_surveys: {}
    };

    this.onPress = this.onPress.bind(this);
  }

  componentWillMount(){
    setTimeout( () => {
        return new Promise((resolve) => {
            return resolve(true);
        })
    //   isSignedIn()
    //   .then(res => {
    //     if(res==false){
    //       this.props.navigation.replace('Home'); this.props.navigation.navigate('SignIn_', {routeName: this.props.navigation.state.routeName});
    //     }
    //     else{
    //       axios.get('http://columbiaapp.eviajes.online/api/surveys/user', { headers: {"Authorization" : `Bearer ${this.props.access_token}`} })
    //       .then(response => {
    //         let items = response.data, forms = [];

    //         for(i = 0; i < items.length; i++){
    //           forms[i] = {
    //             id: items[i].id,
    //             name: items[i].name,
    //             types: {},
    //             options: {
    //               fields: {}
    //             }
    //           }

    //           for (var d = 0; d < items[i].survey_fields.length; d++) {
    //             let item_options = {};

    //             if(items[i].survey_fields[d].type.toString() == "2"){
    //               for (var f = 0; f < items[i].survey_fields[d].survey_options.length; f++) {
    //                 item_options[items[i].survey_fields[d].survey_options[f].id] = items[i].survey_fields[d].survey_options[f].value;
    //               }

    //               forms[i].options.fields[items[i].survey_fields[d].id] = {
    //                 label: items[i].survey_fields[d].name,
    //                 stylesheet: stylesheet,
    //                 transformer: {
    //                   format: value => (value!="" ? value : null),
    //                   parse: value => [value] || null,
    //                 },
    //               };

    //               forms[i].types[items[i].survey_fields[d].id] = t.enums(item_options);
    //             }
    //             else if(items[i].survey_fields[d].type.toString() == "1"){
    //               forms[i].options.fields[items[i].survey_fields[d].id] = {
    //                 label: items[i].survey_fields[d].name,
    //                 stylesheet: stylesheet,
    //                 factory: MultiSelect,
    //                 options: [],
    //               };

    //               for (var f = 0; f < items[i].survey_fields[d].survey_options.length; f++) {
    //                 forms[i].options.fields[items[i].survey_fields[d].id].options.push({
    //                   value: items[i].survey_fields[d].survey_options[f].id,
    //                   text: items[i].survey_fields[d].survey_options[f].value
    //                 });
    //               }

    //               forms[i].types[items[i].survey_fields[d].id] = t.list(t.String);
    //             }
    //             else if(items[i].survey_fields[d].type.toString() == "3"){
    //               forms[i].options.fields[items[i].survey_fields[d].id] = {
    //                 label: items[i].survey_fields[d].name,
    //                 stylesheet: stylesheet,
    //               };

    //               forms[i].types[items[i].survey_fields[d].id] = t.String;
    //             }
    //           }

    //           forms[i].types = t.struct(forms[i].types);
    //         }

    //         this.setState({
    //           forms: forms,
    //           run: true
    //         });
    //       })
    //       .catch(res => {
    //         this.props.navigation.replace('Home'); this.props.navigation.navigate('SignIn_', {routeName: this.props.navigation.state.routeName});
    //       });
    //   }

    // });

    }, 300);
  }

  onPress(id){
    let data = this.refs["form"+id.toString()].getValue();

    if(data){
      this.setState({
        loading: true
      });

      data = JSON.parse(JSON.stringify(data));

      data.id = id;

      axios.post('http://columbiaapp.eviajes.online/api/surveysmade', data, { headers: {"Authorization" : `Bearer ${this.props.access_token}`} })
      .then(response => {
        setTimeout(() => {
          this.setState({
            state_surveys: {
              [id]: true
            }
          }, () => {
            this.setState({
              loading: false
            });
          });

          Alert.alert('Mensaje', 'Encuesta realizada', [
            {text: 'OK'}
          ]);
        }, 1500);
      })
      .catch( (err) => {
        setTimeout(() => {
          Alert.alert('Mensaje', 'No se ha podido enviar la encuesta', [
            {text: 'OK'}
          ]);
        }, 1500);
      });
    }
  }

  render(){
    return(
      <Div name="Encuestas" icon='bar-chart' container={false} loading={!this.state.run || this.state.loading}>
      {
      !this.state.run ? null :
        this.state.forms.map( (item, key) => {

          if(this.state.state_surveys[item.id]!=true) {
            return (
              <Panel key={key} title={item.name}>
                <Form key={key+"f"} ref={"form"+item.id} type={item.types} options={item.options}/>

                <TouchableHighlight key={key+"th"} style={styles.button} onPress={() => this.onPress(item.id)} underlayColor={attributes.underlayColor}>
                  <Text key={key+"t"} style={[styles.buttonText, {}]}>Enviar</Text>
                </TouchableHighlight>
              </Panel>
            );
          }
        })
      }
      </Div>
    );
  }
}

const attributes = {
  underlayColor: '#99d9f4'
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    access_token: state.account.oauth.access_token
  };
};

// export default SurveysContainer;

export default connect(mapStateToProps)(SurveysContainer);