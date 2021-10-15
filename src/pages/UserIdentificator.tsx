import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert

} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Botao } from '../components/button'
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();


    
    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);


    }

    function handleInputFocus(){
        setIsFocused(true);
        
    }
    function handleInputChange( value: string ){
        setIsFilled(!!value);
        setName(value);
        
    }


    async function handleMoveOn(){
        if (!name){
            Alert.alert(`Me diga como te chamar `)
        }
        else {
            try{   await AsyncStorage.setItem('@plantmanager:user',name);  
            navigation.navigate("Confirmation", {
                title: 'Prontinho',
                subTitle: ' Agora vamos cuidar de suas plantinha com muito cuidado',
                buttonTitle: 'começar',
                icon : 'smile',
                nextScreen : 'plantSelect'
            });
             } catch {
                 Alert.alert("Não foi possível salvar o seu nome")
             }
       
        }
    }
    return(
        <SafeAreaView style={style.container}>

            <KeyboardAvoidingView 
                style={style.container}
                behavior = {Platform.OS == 'ios' ? 'height' : 'height'}
                >
                
                <View style={style.content}>               
                    <View style={style.form}>
                        <Text style={style.emoji}>
                            😀 
                        </Text>
                    
                        <Text style={style.title}>
                            Como podemos {'\n'}
                            chamar você
                        </Text>

                        <TextInput 
                            placeholder="Digite o seu nome" 
                            style={[
                                style.Input,
                                (isFocused || isFilled) && { borderColor : colors.green}
                            ]}
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />

                        <View style={style.footer}>
                            <Botao title = "Confirmar"
                            onPress = {handleMoveOn} ></Botao>
                        </View>
                    </View>
                </View>
            
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

const style = StyleSheet.create(
{
    container: {
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around' 

    }, 
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
        width: '100%',
         
    },
    emoji: {
        fontSize: 44
    },
    Input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title:{
        fontSize: 24,
        lineHeight: 32,
        marginTop: 20,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading
    },
    footer:{
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20

    }
}
)