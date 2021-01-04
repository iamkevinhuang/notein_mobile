import React, {useContext} from 'react';
import {StyleSheet, Image} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {FontAwesome} from '@expo/vector-icons';
import NoteForm from '../components/NoteForm';
import {Context as NoteContext} from '../context/NoteContext';

const NoteEditScreen = ({navigation}) => {
    const {editNote, detailNote, state} = useContext(NoteContext);
    const id = navigation.getParam('id');

    return (
        <>
            <NavigationEvents onWillFocus={() => detailNote(id)} />
            <Image
                style={styles.image}
                source={require('../assets/images/edit.png')}
            />
            <NoteForm 
                header="Ubah Catatan"
                buttonSubmitPress={(title, body) => editNote(id, title, body)}
                buttonCancelPress={() => navigation.navigate("NoteDetail", {id: id, title: state.detail.title})}
                loadingStatus={state.loading}
                titleText={state.detail.title}
                bodyText={state.detail.body}
            />
        </>
    )
};

NoteEditScreen.navigationOptions = {
    title: 'Ubah Catatan',
    tabBarIcon: <FontAwesome name="plus" size={20} />,
}


const styles = StyleSheet.create({
    image:{
        marginTop: '-8%',
        width: '100%',
        height: '35%',
        marginBottom: '-14%'
    }
});

export default NoteEditScreen;