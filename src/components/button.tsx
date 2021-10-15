import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface buttonProps extends TouchableOpacityProps{
    title: string;
}

export function Botao( {title, ... rest}: buttonProps){
    return(
        <TouchableOpacity style={style.container}>
            <Text style={style.texto}
                {...rest}
            >
                Confirmar
            </Text>

        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
        container: {
            backgroundColor: colors.green,
            height: 56,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center'
        },

        texto: {
            fontSize: 16,
            color: colors.white,
            fontFamily: fonts.heading

        }

    });