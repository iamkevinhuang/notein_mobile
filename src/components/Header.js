import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {Context as NoteContext} from '../context/NoteContext';
import Spacer from '../components/Spacer';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const Header = ({navigation}) => {
    const {deleteNote} = useContext(NoteContext);
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress = {() => navigation.navigate('NoteEdit', {id: navigation.getParam('id')})}>
                <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <Spacer mr={10}/>
            <TouchableOpacity 
                onPress= {() => Alert.alert(
                    'Peringatan', 'Apakah anda akan menghapus catatan ini ?', 
                    [
                        {
                            text: "Tidak",
                        },
                        {
                            text: "Ya",
                            onPress: () => {
                                {deleteNote(navigation.getParam('id')); navigation.pop(); };
                            }
                        }
                    ]
                )}>
                <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
            <Spacer mr={5}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
    },
});

export default withNavigation(Header);