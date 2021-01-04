import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Text, Button, Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Spacer from '../components/Spacer';

const SigninScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container} >
            <Text h3>Masuk ke NoteIn.</Text>
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
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
            <Spacer ml={10} mr={10} >
                {state.loading ? state.loading === false ? <Button title="Login" onPress={() => signin({username, password})} /> : <Button loading /> :<Button title="Login" onPress={() => signin({username, password})} /> }
            </Spacer>

            <Spacer mt={20}>
                <TouchableOpacity onPress={() => {navigation.navigate('Signup');clearErrorMessage(); }}>
                    <Text style={styles.link}>Belum mempunyai akun ? Daftar sekarang !</Text>
                </TouchableOpacity>
            </Spacer>
        </View>
    )
};

SigninScreen.navigationOptions = {
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

export default SigninScreen;