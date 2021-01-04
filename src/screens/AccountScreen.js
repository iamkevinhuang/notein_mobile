import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator } from 'react-native';
import {Button, Image, Text, Input} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';


const AccountScreen = () => {
    const {state, signout, updateProfile, clearErrorMessage, whoami} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        whoami();
    }, []);
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={() => {setPassword(''); setPasswordConfirmation('')}} />

            <View style={styles.top}>
                <View>
                    {state.whoami 
                        ? 
                            <View style={styles.profile}>
                                <Image
                                    source={{ uri: `https://ui-avatars.com/api/?name=${state.whoami}&background=random` }}
                                    style={styles.profilePicture}
                                    PlaceholderContent={<ActivityIndicator size="large" color="#0000ff" />}
                                />
                                <Text h2>{state.whoami}</Text>
                            </View>
                        : 
                            <View style={styles.profile}>
                                <Image
                                    style={styles.profilePicture}
                                    PlaceholderContent={<ActivityIndicator size="large" color="#0000ff" />}
                                />
                                <Text h2>Loading</Text>
                            </View>
                    }
                    
                </View>
                <Spacer mt={50}>
                    <Text h3>Ganti Password</Text>
                    <Spacer ml={5} mr={5} >
                        <Input
                            placeholder='Password'
                            leftIcon={
                                <AntDesign name="lock" size={24} color="black" />
                            }
                            value={password}
                            onChangeText={(pass) => {setPassword(pass); clearErrorMessage()}} 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            secureTextEntry 
                            style={styles.passwordInput}
                        />

                        <Input
                            placeholder='Konfirmasi Password'
                            leftIcon={
                                <AntDesign name="lock" size={24} color="black" />
                            }
                            value={password_confirmation}
                            onChangeText={(pass) => {setPasswordConfirmation(pass); clearErrorMessage()}} 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            secureTextEntry 
                            style={styles.passwordInput}
                        />
                        
                        {state.loading ? state.loading === false 
                            ? 
                                <Button 
                                    title="Ganti Password" 
                                    onPress={() => updateProfile({password, password_confirmation})} 
                                /> 
                                : 
                                <Button loading /> 
                            : 
                                <Button 
                                    title="Ganti Password" 
                                    onPress={() => updateProfile({password, password_confirmation})} /> 
                        }

                    </Spacer>
                </Spacer>                
            </View>

            {state.errorMessage 
                ?
                    <View style={styles.containerSnackbar}>
                        <Snackbar style={styles.errorMessage}
                            visible
                            onDismiss={() => clearErrorMessage()}
                            action={{
                                label: 'OK',
                                onPress: () => {
                                    clearErrorMessage()
                                },
                            }}>
                            {state.errorMessage}
                        </Snackbar>
                    </View>
                : 
                    null
            }

            {state.successMessage 
                ?   
                    <View style={styles.containerSnackbar}>
                        <Snackbar style={styles.successMessage}
                            visible
                            onDismiss={() => clearErrorMessage()}
                            action={{
                                label: 'OK',
                                onPress: () => {
                                    clearErrorMessage()
                                },
                            }}>
                            {state.successMessage}
                        </Snackbar>
                    </View>
                :
                    null
            }

            <Spacer ml={5} mr={5} mb={5}>
                <TouchableOpacity onPress={signout} style={styles.signOutButton}>
                    <Text style={styles.buttonSignOutText}>KELUAR</Text>
                </TouchableOpacity>
            </Spacer>
        </View>
    )
};

AccountScreen.navigationOptions = {
    title: 'Akun NoteIn.',
    tabBarIcon: ({ tintColor }) => <FontAwesome name="gear" size={20} color={tintColor}/>,
}
    

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    profile:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    profilePicture: {
        width: 90, 
        height: 90,
        borderRadius: 100,
        marginHorizontal: 10
    },
    top:{
        flex: 1,
        justifyContent: 'center',
    },
    signOutButton:{
        backgroundColor: '#dc3545',
        width: '100%',
        borderRadius: 5,
    },
    buttonSignOutText:{
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 20,
        height: 50
    },
    errorMessage:{
        backgroundColor: 'red'
    },
    successMessage:{
        backgroundColor: 'green'
    },
    passwordInput:{
        paddingLeft: 5
    },
    containerSnackbar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});

export default AccountScreen;