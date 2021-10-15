import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text

} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Botao } from '../components/button';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

interface Params{
    title: string;
    subTitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;

}

const emojis = {
    hug : '🤗',
    smile: '😁'
}

export function Confirmation(){
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params

    function handleMoveOn(){
        navigation.navigate(nextScreen)
    }



    return(
        <SafeAreaView style={style.container}>
                <View style={style.content}>               
                        <Text style={style.emoji}>
                            {emojis[icon]}
                        </Text>
                    
                        <Text style={style.title}>
                           {title}
                        </Text>

                        <Text style={style.Subtitle}>
                          {subTitle}

                        </Text>

                        <View style={style.footer}>
                            <Botao
                            title = "Começar"
                            onPress = {handleMoveOn}
                            />
                        </View>

                </View>

        </SafeAreaView>

    )
};

const style = StyleSheet.create(
{
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around' 

    }, 

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 30

        
    },
   
    emoji: {
        fontSize: 50
    },
 
    title:{
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },

    Subtitle:{
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 15,
        paddingVertical: 10,
        color: colors.heading
    },

    footer:{
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 50
        

    }
}
)

function useRoutes() {
    throw new Error('Function not implemented.');
}
