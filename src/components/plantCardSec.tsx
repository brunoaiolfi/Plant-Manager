import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Animated,
    KeyboardAvoidingViewComponent
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


import {
    RectButton,
     RectButtonProps} from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import eachDayOfIntervalWithOptions from 'date-fns/esm/fp/eachDayOfIntervalWithOptions/index.js';
import { Feather } from '@expo/vector-icons';


interface PlantProps extends RectButtonProps{
    data: {
        name: string;
        photo: string;
        hour: string;

    };
    handleRemove: () => void;
};

export const PlantCardSec = ({ data, handleRemove, ...rest } : PlantProps) => {
    return(
        <Swipeable 
            overshootRight = {false}
            renderRightActions = {() => (
                <Animated.View>
                    <View>
                        <RectButton
                           style={style.remove} 
                           onPress={handleRemove}
                        >

                            <Feather name="trash" size={32} color={colors.white}></Feather>

                        </RectButton>
                    </View>

                </Animated.View> 

            )}
        >
        <RectButton style={style.container}
        {...rest}>
            <SvgFromUri 
            uri={data.photo} 
            width={70}
            height = {70}
             />

            <Text style={style.title}>
                {data.name}
            </Text>

            <View style={style.details}>
                <Text style={style.timeLabel}> 
                    {data.hour}
                </Text>
                <Text style={style.time}> 
                    {data.hour}
                </Text>

            </View>
            
        </RectButton>
        </Swipeable>

    )
}

const style = StyleSheet.create({
    container:{
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5

    },

    title:{
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,

    },
    details:{
        alignItems: 'flex-end'
    }
    ,
    timeLabel:{
        fontSize: 15,
        fontFamily: fonts.text,
        color: colors.body_dark,

    },
    time :{
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    remove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 15,
        paddingLeft: 15
    }
});