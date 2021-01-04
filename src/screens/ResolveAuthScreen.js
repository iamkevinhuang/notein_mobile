import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {
    const {tryLocalSignin} = useContext(AuthContext);
    
    useEffect(() => {
        tryLocalSignin();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            <View>
                <Text style={styles.loadingText}>LOADING</Text>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    loadingText:{
        fontSize: 30,
        alignContent: 'center',
        textAlign: 'center',

    },
    container:{
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1
    },
});

export default ResolveAuthScreen;