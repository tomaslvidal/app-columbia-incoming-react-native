import React, { Component } from 'react';

import { connect } from 'react-redux';

// import { isSignedIn } from 'ColumbiaIncoming/auth';

import { Text, View, Alert, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';

import CollapsibleList from 'react-native-collapsible-list'

import Div from 'ColumbiaIncoming/layouts/default';

import Panel from 'ColumbiaIncoming/components/PanelComponent';

import MultiSelect from 'ColumbiaIncoming/components/MultiSelectComponent';

import t from 'tcomb-form-native'

import { merge } from 'lodash';

import axios from 'axios';

import _ from 'lodash';

import parseFormData from 'json-form-data';

const Form = t.form.Form;

class SurveysContainer extends Component {
    constructor(props){
        super(props);

        this.stylesheet = merge(Form.stylesheet, {
            controlLabel: {
                normal: {
                    color: '#343434',
                    fontSize: 15,
                    fontWeight: 'bold'
                },
                error: {
                    color: '#E44545'
                }
            },
            select: {
                normal: {
                    color: undefined
                }
            },
            textbox: {
                normal: {
                    color: 'black'
                }
            },
            helpBlock: {
                error: {
                    color: '#E44545'
                }
            }
        })
        
        this.state = {
            loading: true,
            state_surveys: {},
            forms: []
        };

        this.onPress = this.onPress.bind(this);
    }

    componentWillMount(){
        axios({
            method: 'GET',
            url: 'http://www.columbiaviajes.com/admin/services/api_encuestas.php'
        })
        .then(res => res.data)
        .then(res => {
            let surveys = res.filter((item, index, array) => array.findIndex(item2 => item2.id_encuesta == item.id_encuesta) === index ), forms = [];

            surveys = surveys.map(item => {
                return({
                    estado: item.estado,
                    fecha_creacion: item.fecha_creacion,
                    id_encuesta: item.id_encuesta,
                    nombre: item.nombre,
                    preguntas: res.filter((item2, index2, array2) => item2.id_encuesta === item.id_encuesta).map(item3 => {
                        return({
                            id_pregunta: item3.id_pregunta,
                            nombre: '22d',
                            tipo: item3.tipo,
                            respuestas: res.filter(item4 => item4.id_pregunta === item3.id_pregunta).map(item4_m => {
                                return({
                                    respuesta: item4_m.respuesta,
                                    id_respuesta: item4_m.id_respuesta
                                });
                            }).sort((a, b) => a.id_respuesta > b.id_respuesta ? 1 : (a.id_respuesta == b.id_respuesta ? 0 : -1) )
                        })
                    }).filter((item, index, array) => array.findIndex(item2 => item2.id_pregunta == item.id_pregunta) === index).sort((a, b) => a.id_pregunta > b.id_pregunta ? 1 : (a.id_pregunta == b.id_pregunta ? 0 : -1) )
                });
            });

            for(i = 0; i < surveys.length; i++){
                forms[i] = {
                    id: surveys[i].id_encuesta,
                    name: surveys[i].nombre,
                    types: {},
                    options: {
                        fields: {}
                    }
                }

                for(let d = 0; d < surveys[i].preguntas.length; d++){
                    let item_options = {};

                    if(surveys[i].preguntas[d].tipo === "2"){
                        for (let f = 0; f < surveys[i].preguntas[d].respuestas.length; f++) {
                            item_options[surveys[i].preguntas[d].respuestas[f].id_respuesta] = surveys[i].preguntas[d].respuestas[f].respuesta;
                        }

                        forms[i].options.fields[surveys[i].preguntas[d].id_pregunta] = {
                            label: surveys[i].preguntas[d].nombre,
                            stylesheet: this.stylesheet,
                            optionsx: item_options,
                            transformer: {
                                format: value => {
                                    return(value !== '' ? value : null)
                                },
                                parse: value => {
                                    return value || null;
                                }
                            },
                        };

                        forms[i].types[surveys[i].preguntas[d].id_pregunta] = t.enums(item_options);
                    }
                    else if(surveys[i].preguntas[d].tipo === "1"){
                        forms[i].options.fields[surveys[i].preguntas[d].id_pregunta] = {
                            label: surveys[i].preguntas[d].nombre,
                            stylesheet: this.stylesheet,
                            factory: MultiSelect,
                            options: [],
                        };

                        for(let f = 0; f < surveys[i].preguntas[d].respuestas.length; f++) {
                            forms[i].options.fields[surveys[i].preguntas[d].id_pregunta].options.push({
                                value: surveys[i].preguntas[d].respuestas[f].id_respuesta,
                                text: surveys[i].preguntas[d].respuestas[f].respuesta
                            });
                        }

                        forms[i].types[surveys[i].preguntas[d].id_pregunta] = t.list(t.String);
                    }
                    else if(surveys[i].preguntas[d].tipo === "3"){
                        forms[i].options.fields[surveys[i].preguntas[d].id_pregunta] = {
                            label: surveys[i].preguntas[d].nombre,
                            id_respuesta: surveys[i].preguntas[d].respuestas[0].id_respuesta,
                            stylesheet: this.stylesheet,
                        };

                        forms[i].types[surveys[i].preguntas[d].id_pregunta] = t.String;
                    }
                }

                forms[i].types = t.struct(forms[i].types);
            }

            this.setState({
                forms: forms,
                loading: false
            });
        });
    }

    onPress(item_param){
        let data = this.refs["form"+item_param.id].getValue();

        if(data){
            this.setState({
                loading: true
            });

            data = JSON.parse(JSON.stringify(data));

            axios({
                method: 'POST',
                url: 'http://www.columbiaviajes.com/admin/encuestas/test.php',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: parseFormData({
                    encuesta_id: item_param.id,
                    agencia_id: 32,
                    preguntas: Object.keys(data).map((k) => {
                        let key = k;

                        let item = data[key];

                        return({
                            encuesta_pregunta_id: key,
                            encuesta_pregunta_text: item_param.options.fields[key].label,
                            respuestas: ((item) => {
                                if(item instanceof Array){
                                    return item.map(item2 => {
                                        return({
                                            encuesta_respuesta_id: item2,
                                            encuesta_respuesta_text: item_param.options.fields[key].options.filter(item => item.value === item2)[0].text
                                        })
                                    })
                                }
                                else{
                                    if(typeof item_param.options.fields[key].optionsx !== "undefined"){
                                        return([
                                            {
                                                encuesta_respuesta_id: item,
                                                encuesta_respuesta_text: item_param.options.fields[key].optionsx[item]
                                            }
                                        ])
                                    }
                                    else{
                                        return([
                                            {
                                                encuesta_respuesta_id: item_param.options.fields[key].id_respuesta,
                                                encuesta_respuesta_text: item
                                            }
                                        ])
                                    }
                                }
                            })(item)
                        });
                    })
                })
            })
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        state_surveys: {
                            [item_param.id]: true
                        },
                        loading: false
                    });

                    Alert.alert('Mensaje', 'Encuesta realizada', [
                        {text: 'OK'}
                    ]);
                }, 1500);
            })
            .catch( e => {
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
            <Div name="Encuestas" icon='bar-chart' container={false} loading={this.state.loading}>
            {
                this.state.forms.map( (item, key) => {
                    if(!this.state.state_surveys[item.id]){
                        return (
                            <Panel key={key} title={item.name}>
                                <Form key={key+"f"} ref={"form"+item.id} type={item.types} options={item.options}/>

                                <TouchableHighlight 
                                    key={key+"th"}
                                    style={styles.button}
                                    onPress={() => this.onPress(item)}
                                    underlayColor={attributes.underlayColor}
                                >
                                    <Text 
                                        key={key+"t"}
                                        style={[styles.buttonText, {}]}
                                    >
                                        Enviar
                                    </Text>
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

export default SurveysContainer;