import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Text, Button, Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Spacer from '../components/Spacer';

const SignupScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    return (
        <View style={styles.container} >
            <Text h3>Daftar ke NoteIn.</Text>
            <Spacer mt={10} />
            <Input
                label="Username" 
                value={username} 
                onChangeText={setUsername} 
                autoCapitalize="none" autoCorrect={false} 
            />
            <Input 
                label="Password" 
                value={password} 
                onChangeText={setPassword} 
                autoCapitalize="none" 
                autoCorrect={false} 
                secureTextEntry 
            />
            <Input 
                label="Konfirmasi Password" 
                value={password_confirmation} 
                onChangeText={setPasswordConfirmation} 
                autoCapitalize="none" 
                autoCorrect={false} 
                secureTextEntry 
            />
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
            <Spacer ml={10} mr={10} >
                {state.loading ? state.loading === false ? <Button title="Register" onPress={() => signup({username, password, password_confirmation})} /> : <Button loading /> : <Button title="Register" onPress={() => signup({username, password, password_confirmation})} /> }
            </Spacer>
            <Spacer mt={20}>
                <TouchableOpacity onPress={() => {navigation.navigate('Signin'); clearErrorMessage(); }}>
                    <Text style={styles.link}>Sudah mempunyai akun ? Log In sekarang !</Text>
                </TouchableOpacity>
            </Spacer>
        </View>
    )
};

SignupScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    },
    link:{
        color: 'blue',
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
});

export default SignupScreen;