import React, {useContext} from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import NoteForm from '../components/NoteForm';
import {Context as NoteContext} from '../context/NoteContext';


const NoteCreateScreen = ({navigation}) => {
    const {createNote, state} = useContext(NoteContext);

    return (
        <>
            <Image
                style={styles.image}
                source={require('../assets/images/add.png')}
            />
            <NoteForm 
                header="Tambah Catatan"
                buttonSubmitPress={(title, body) => createNote(title, body)}
                buttonCancelPress={() => navigation.navigate("NoteList")}
                loadingStatus={state.loading}
                titleText=""
                bodyText=""
            />
        </>
    )
};

NoteCreateScreen.navigationOptions = {
    title: 'Tambah Catatan',
    tabBarIcon: ({ tintColor }) => <FontAwesome name="plus" size={20} color={tintColor}/>
}


const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: '35%',
        marginBottom: '-12%'
    }
});

export default NoteCreateScreen;