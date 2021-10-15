import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import {
    RectButton,
     RectButtonProps} from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface EnviromentButtonProps extends RectButtonProps{ 
    title: string;
    active?: boolean;
}

export function EnviromentButton({
    title,
    active = false,
    ...rest} : EnviromentButtonProps
){
    return(
        <RectButton style={ 
            [style.container,
        active && style.containerActive]
    }
        {...rest}>
            <Text style={[style.text, active && style.textActive]}> {title}</Text>
        </RectButton>
      
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    containerActive:{
        backgroundColor: colors.green_light
    },
    text:{
        color: colors.heading,
        fontFamily: fonts.text,
    },
    textActive:{
        color: colors.heading
    },

    });