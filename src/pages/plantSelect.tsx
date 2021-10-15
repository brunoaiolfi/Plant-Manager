import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,

} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Botao } from '../components/button';
import { Header} from '../components/header'
import { EnviromentButton} from '../components/Enviroment'
import api from '../services/api';
import { PlantCardPrimary } from '../components/plantCard';
import { useNavigation } from '@react-navigation/core';
import Navigation from '../../navigation';
import { PlantProps } from '../libs/storage';


interface EnvironmentProps{
    key: string;
    title: string;

}

export function plantSelect(){

    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants ] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const navigation = useNavigation();

    function handleEnvironmentSelected(environment: string){
        setEnvironmentSelected(environment);

        if (environment == 'all'){
            return setFilteredPlants(plants);
        
        }

        const filtered = plants.filter(plant => plant.environments.includes(environment));

        setFilteredPlants(filtered);
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', {plant});
    }

    useEffect(() => {
        async function fetchEnviroment(){
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos',
                    
                },
                ...data
            ]);
    }
    
    fetchEnviroment();  
    }, []   )

    useEffect(() => {
        async function fetchPlants(){
            const { data } = await api.get('plants?_sort=name&_order=asc');
            setPlants(data);
    }
    
    fetchPlants();  
    }, [])

    return(
        <View style={style.container}>
            <Header />

            <View  style={style.header}>

            <Text style={style.title}> 
            Selecione em qual ambiente
            </Text>

            <Text style={style.subTitle}> 
            Você quer colocar a sua planta. 
            </Text>
            </View>

            <View>

                    <FlatList data={environments}
                    keyExtractor = {(item) => String(item.key)}
                    renderItem = {({ item }) => (

                    <EnviromentButton 
                    title={item.title} 
                    active = {item.key == environmentSelected}
                    onPress = {() => handleEnvironmentSelected(item.key)} />
                    )} 

                    horizontal 
                    showsHorizontalScrollIndicator = {false}
                    contentContainerStyle={style.EnviromentList} />

                   
            </View>

            <View style={style.plantas}>

                <FlatList 
                data={filteredPlants}
                keyExtractor = {(item) => String(item.id)}
                renderItem={({item}) => (
                    <PlantCardPrimary data={item} 
                    onPress={()=> handlePlantSelect(item)}
                    />
                )}
                
                showsVerticalScrollIndicator = {false}
                numColumns={2}

                />

            </View>


            
            
        </View>

    )
};

const style = StyleSheet.create(
{
    container: {
        flex:1,

    }, 
    title:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop:  15
    },
    subTitle:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },
    header:{
        padding: 30
    },
    EnviromentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
        
    },
    plantas:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'        
    },
  
    

}
)