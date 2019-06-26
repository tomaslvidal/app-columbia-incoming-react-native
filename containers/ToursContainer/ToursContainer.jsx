import React, { Component } from 'react';

import { View, Text, StyleSheet, ListView } from 'react-native';

import Div from 'ColumbiaIncoming/layouts/default';

import Panel from 'ColumbiaIncoming/components/PanelComponent';

import ItemContainer from './ItemContainer';

export default class ToursContainer extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
          dataSource: ds,
            items: [],
            loading: true,
            run: true
        }
    }

    updateDataSource(data){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        });
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                items: [
                    {
                        image1: 'https://e00-ar-marca.uecdn.es/claro/assets/multimedia/imagenes/2019/06/11/15602607596976.jpg',
                        title: 'Test1',
                        description: `
                            <div>
                                <img src="https://rfg.eviajes.online/vue/assets/img/preloaderRFG.281f3450.png" />
                                
                                <p> Probando el componente......</p>
                            </div>
                        `
                    },
                    {
                        image1: 'http://hertz.eviajes.online/banner_hertz.jpg',
                        title: 'Test2',
                        description: `
                        <div>
                                <img src="https://rfg.eviajes.online/vue/assets/img/preloaderRFG.281f3450.png" />
                                
                                <p> Probando el componente......</p>
                            </div>
                        `
                    },
                    {
                        image1: 'http://hertz.eviajes.online/banner_hertz.jpg',
                        title: 'Test3',
                        description: `
                            <div>
                                <img src="https://rfg.eviajes.online/vue/assets/img/preloaderRFG.281f3450.png" />
                                
                                <p> Probando el componente......</p>
                            </div>
                        `
                    }
                ],
                loading: false
            }, () => {
                this.updateDataSource(this.state.items);
            });
        }, 3000);
    }
    
    render() {
        return (
            <Div name="Tours" container={false} loading={!this.state.run || this.state.loading}>
                {this.state.items.map((item, index) => {
                    return(
                        <Panel key={index} title={item.title}>
                            <ItemContainer key={index} item={item} />
                        </Panel>
                    );
                })}
            </Div>
        );
    }
}

const styles = StyleSheet.create({
    
})