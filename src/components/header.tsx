import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../image/userImg.png';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function name() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }


    },[]);

    return(
        <View style= {style.container}>
            <View>
                <Text style= {style.greeting}> Olá </Text>
                <Text style= {style.name}> {userName}  </Text>
            </View>

            <Image source={ userImg } style={style.img} />
        </View>
    )
}

const style = StyleSheet.create({
        container: {

            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            // marginTop: getStatusBarHeight(),
            paddingHorizontal: 30

        },
        img:{
            width: 55,
            height: 55,
            borderRadius: 30

        },

        greeting:{
            fontSize: 32,
            color: colors.heading,
            fontFamily: fonts.text
        },

        name:{
            fontSize: 32,
            color: colors.heading,
            fontFamily: fonts.heading,
            lineHeight: 40
        },
       

    });