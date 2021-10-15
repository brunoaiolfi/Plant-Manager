import React, { useEffect, useState } from 'react';
import {Alert,
StyleSheet,
Text,
View,
Image,
ScrollView,
Platform,
TouchableOpacity,
FlatList
} from 'react-native';

import { Header } from '../components/header';
import colors from '../styles/colors';
import WaterDrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR/index';
import fonts from '../styles/fonts';
import { PlantCardSec } from '../components/plantCardSec';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function MyPlants(){
    const [myPlants, setmyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    function handleRemove (plant:PlantProps){

        Alert.alert('Remover', `deseja remover a ${plant.name}`,[
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                       
                        await removePlant(plant.id)

                        setmyPlants((oldData) => 
                            oldData.filter((item) => item.id !== item.id )
                        );

                    }   catch (error) {
                        Alert.alert('Não foi possível remover!')

                    }
                }
            },
        ])
    } 

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(), {
                    locale: ptBR
                }

            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} às ${nextTime} horas.`
            )

            setmyPlants(plantsStoraged);
            setLoading(false)
            


        }
    })
    return (
        <View style={style.container}>
            <Header />

            <View style={style.spotLight}>
                <Image source={WaterDrop}
                    style={style.spotLightImage}
                ></Image>

                <Text style={style.spotLightText}>
                    {nextWatered }
                </Text>
            </View>

            <View
            style={style.plants}>
                <Text style={style.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor = {(item) => String(item.id)}
                    renderItem={({item}) => (
                            <PlantCardSec data={item}
                            handleRemove = {() => {handleRemove(item)}} />
                        )}
                        
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle = {{flex: 1}}
                    >

                </FlatList>
            </View>
        </View>

    )
}

const style = StyleSheet.create(
{  
      container: {
        flex: 1 ,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius : 20,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    spotLightImage: {
        width: 60,
        height: 60,

    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 28,
        textAlign: 'justify'
    },
    plants: {
        flex:  1,
        width: '100%',

    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    }

})