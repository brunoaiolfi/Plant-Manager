import React from 'react';
import { Text,
     SafeAreaView, 
     Image, 
     TouchableOpacity,
     Dimensions, 
     StyleSheet } from 'react-native';

import { Entypo, Feather } from '@expo/vector-icons';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate("UserIdentification")
    }
    return(
        <SafeAreaView style={style.Container}>
            <Text style={style.Title}>
                Gerencie {'\n'}
                suas plantas de {'\n'}
                forma fácil
            </Text>
            <Image 
            
            style={style.Image} 
            source={wateringImg}
            resizeMode = 'contain'
            

            />

            <Text style={style.SubTitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity style={style.Button} activeOpacity = {0.8}
            onPress = {handleStart}>
                    <Feather  style={style.ButtonIcon} name="chevrons-right"></Feather>
            </TouchableOpacity>

        </SafeAreaView>

    )
    
}

const style = StyleSheet.create({
    Container:
        {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around'
        },
    Title: 
        {
            fontSize: 32,
            fontWeight: "600",
            lineHeight: 38,
            textAlign: "center",
            color: colors.heading,
            marginTop: 38,
            fontFamily: fonts.heading

        },
        
    SubTitle:
        {
            textAlign: 'center',
            fontWeight: 'normal',
            fontSize: 17,
            lineHeight: 25,
            paddingHorizontal: 20,
            color: colors.body_light,
            fontFamily: fonts.text
        },  
   
    Image:
        {
            height: Dimensions.get('window').width * 0.7
        },
    Button:
        {
            width: 56,
            height: 56,
            backgroundColor: colors.green,
            alignItems: 'center',
            borderRadius: 16,
            justifyContent: 'center',
            marginBottom: 10

        },
    ButtonIcon:
        {
            color: colors.white,
            fontSize: 30,
            
        }
}
);
