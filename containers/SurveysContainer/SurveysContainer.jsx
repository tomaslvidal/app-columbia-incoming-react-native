import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Text, View, Alert, FlatList, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';

import CollapsibleList from 'react-native-collapsible-list'

import Div from 'ColumbiaIncoming/layouts/default';

import Panel from 'ColumbiaIncoming/components/PanelComponent';

import MultiSelect from 'ColumbiaIncoming/components/MultiSelectComponent';

import t from 'tcomb-form-native'

import { merge } from 'lodash';

import axios from 'axios';

import _ from 'lodash';

import { setSurveys, hiddenSurveys } from 'ColumbiaIncoming/actions';

import parseFormData from 'json-form-data';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';

import { faPlaneDeparture, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faPlaneDeparture, faTimes);

let Form = t.form.Form;

let stylesheet = JSON.parse(JSON.stringify(Form.stylesheet));

stylesheet = merge(stylesheet, {
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
});

class SurveysContainer extends Component {
    constructor(props){
        super(props);

        this.onPress = this.onPress.bind(this);

        this.state = {
            is_refreshing: false
        };

        this.onRefresh = this.onRefresh.bind(this);
    }

    fetchSurveys(is_refreshing = false){
        this.setState({
            is_refreshing
        }, () => {
            axios({
                method: 'GET',
                url: `http://www.columbiaviajes.com/admin/services/api_encuestas.php`
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
                                nombre: item3.pregunta_text,
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
                                optionsx: item_options,
                                stylesheet,
                                transformer: {
                                    format: value => {
                                        return(typeof value !== "undefined" ? value : '');
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
                                factory: MultiSelect,
                                stylesheet,
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
                                stylesheet
                            };

                            forms[i].types[surveys[i].preguntas[d].id_pregunta] = t.String;
                        }
                    }

                    forms[i].types = t.struct(forms[i].types);
                }

                this.setState({
                    is_refreshing: false
                }, () => {
                    this.props.setSurveys({
                        items: forms,
                        loading: false
                    });
                });
            });
        });
    }

    onRefresh(){
        this.fetchSurveys(true);
    }

    componentDidMount(){
        if(this.props.surveys.items.length === 0){
            this.fetchSurveys();
        }
    }

    onPress(item_param){
        let data = this["form"+item_param.id].getValue();

        if(data){
            this.props.setSurveys({
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
                    agencia_id: this.props.account.id,
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
                    this.props.hiddenSurveys({
                        [item_param.id]: true
                    })
                    .then(() => {
                        this.props.setSurveys({
                            loading: false
                        })
                        .then(() => {
                            Alert.alert('Info', 'Successful survey', [
                                { text: 'OK' }
                            ]);
                        });
                    })
                }, 1500);
            })
            .catch( e => {
                setTimeout(() => {
                    Alert.alert('Info', 'The survey could not be sent', [
                        { text: 'OK' }
                    ]);
                }, 1500);
            });
        }
    }

    render(){
        return(
            <Div onRefresh={this.onRefresh} is_refreshing={this.state.is_refreshing} name="Encuestas" icon='bar-chart' container={false} loading={this.props.surveys.loading}>
                {
                    this.props.surveys.items.length > 0 ?
                        <FlatList
                            data={this.props.surveys.items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={ ({item, index}) => {
                                if(!this.props.surveys.hiddens[item.id]) {
                                    return(
                                        <Panel key={index} title={item.name}>
                                            <Form key={index+"f"} ref={(ref) => this["form"+item.id] = ref} type={item.types} options={item.options}/>

                                            <TouchableHighlight 
                                                key={index+"th"}
                                                style={styles.button}
                                                onPress={() => this.onPress(item)}
                                                underlayColor={attributes.underlayColor}
                                            >
                                                <Text 
                                                    key={index+"t"}
                                                    style={[styles.buttonText, {}]}
                                                >
                                                    Send
                                                </Text>
                                            </TouchableHighlight>
                                        </Panel>
                                    );
                                }
                            }}
                        />
                    :
                        (
                            <View style={{ alignItems: 'center' }}>
                                <FontAwesomeIcon 
                                    size={37} 
                                    color={"#10db7a"} 
                                    icon={['fas', 'plane-departure']}
                                />

                                <FontAwesomeIcon 
                                    size={25}
                                    style={{ top: -30 }}
                                    color={"#575958"} 
                                    icon={['fas', 'times']}
                                />

                                <Text style={{ fontSize: 16, textAlign: 'center', marginTop: -17 }}>
                                    No surveys found.
                                </Text>
                            </View>
                        )
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
        account: state.account.info.data,
        surveys: state.surveys
    };
};

export default connect(mapStateToProps, { setSurveys, hiddenSurveys })(SurveysContainer);