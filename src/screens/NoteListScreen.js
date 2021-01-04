import React, { useContext } from 'react';
import {FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {ListItem, Text, Button} from 'react-native-elements';
import {Context as NoteContext} from '../context/NoteContext';
import Spacer from '../components/Spacer';

const NoteListScreen = ({navigation}) => {
    const {state, fetchNotes} = useContext(NoteContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={fetchNotes} />
            { state.notes
                ?
                    state.notes.length > 0 
                        ? 
                            <FlatList 
                                data={state.notes}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({item}) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('NoteDetail', {id: item.id, title: item.title})}>
                                            <ListItem>
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.title}</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron />
                                            </ListItem>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        :
                            <View style={styles.containerTwo}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/images/empty.png')}
                                />
                                <Text style={styles.emptyText}>Belum ada Catatan ni. Coba buat satu !</Text>
                                <Spacer mt={10}>
                                    <Button 
                                        title="Buat Catatan" 
                                        onPress={() => {navigation.navigate('NoteCreate')}}
                                    />
                                </Spacer>
                            </View>
                :
                    <ActivityIndicator size="large" color="#0000ff" />
            }
        </View>
    )
};

NoteListScreen.navigationOptions = {
    title: 'Catatan'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTwo:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: '90%',
        height: '37%',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default NoteListScreen;