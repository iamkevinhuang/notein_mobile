import React, { useContext, useState } from 'react';
import {StyleSheet, View, ActivityIndicator, TouchableOpacity, Text, ScrollView} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Context as NoteContext} from '../context/NoteContext';
import Clipboard from 'expo-clipboard';
import Spacer from '../components/Spacer';
import Header from '../components/Header';
import { Snackbar } from 'react-native-paper';

const NoteDetailScreen = ({navigation}) => {
    const {state, detailNote} = useContext(NoteContext);
    const id = navigation.getParam('id');
    const [visibleSnackbar, setVisibleSnackbar] = useState(false);

    return (
        <>
            <NavigationEvents onWillFocus={() => detailNote(id)} />
            { state.detail
                ?
                    <View style={styles.container}>
                        <ScrollView style={styles.top}>
                            <Spacer mt={10} mb={10} mr={10} ml={10}>
                                <Text style={styles.textBody}>{state.detail.body}</Text>
                                <Text style={styles.line}>Pertama Kali Disimpan Pada :</Text>
                                <Text style={styles.date}>{Date(state.detail.created_at)}</Text>
                                <Text>Terakhir Diupdate Pada :</Text>
                                <Text style={styles.date}>{Date(state.detail.updated_at)}</Text>
                            </Spacer>
                        </ScrollView>


                        <Spacer mr={5} ml={5} mt={5} mb={5}>
                            <View>
                                <Snackbar
                                    visible={visibleSnackbar}
                                    onDismiss={() => setVisibleSnackbar(false)}
                                    action={{
                                        label: 'OK',
                                        onPress: () => {
                                            setVisibleSnackbar(false)
                                        },
                                    }}>
                                    Berhasil Disalin.
                                </Snackbar>
                            </View>
                            <TouchableOpacity 
                                style={styles.buttonClipboard} 
                                onPress={() => {Clipboard.setString(state.detail.body); setVisibleSnackbar(true)}}
                            >
                                <Text style={styles.buttonClipboardText}>SALIN KE CLIPBOARD</Text>
                            </TouchableOpacity>
                        </Spacer>
                    </View>
                :
                    <ActivityIndicator size="large" color="#0000ff" />
            }

        </>
    )
};

NoteDetailScreen.navigationOptions = ({navigation}) => {
    return {
        title: navigation.getParam('title'),
        headerRight: () => (
            <Header />
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    top:{
        flex: 1
    },
    line:{
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'black',
    },
    textBody:{
        fontSize: 20,
        textAlign: 'justify',
    },
    buttonClipboard: {
        borderColor: '#fcb000',
        borderRadius: 5,
        borderWidth: 3,
    },
    buttonClipboardText:{
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#fcb000',
        height: 40
    },
    date:{
        fontWeight: 'bold'
    }
});

export default NoteDetailScreen;