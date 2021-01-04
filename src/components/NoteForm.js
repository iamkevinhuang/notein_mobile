import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-elements';
import {Input} from 'react-native-elements';
import Spacer from '../components/Spacer';

const NoteForm = ({header, buttonCancelPress, buttonSubmitPress, loadingStatus, titleText, bodyText}) => {
    const [title, setTitle] = useState(titleText);
    const [body, setBody] = useState(bodyText);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Spacer mt={10} />
                <Text h4 style={styles.title} >{header}</Text>
                <Spacer mt={15}>
                    <Input
                        placeholder='JUDUL'
                        value={title}
                        onChangeText={setTitle} 
                    />
                    <Input
                        placeholder='ISI CATATAN ANDA'
                        multiline
                        numberOfLines = {15}
                        value={body}
                        onChangeText={setBody} 
                        style={styles.textArea}
                    />
                </Spacer>
            </View>
            <Spacer mb={15}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonSave} onPress={() => buttonSubmitPress(title, body)}>
                        {
                            loadingStatus 
                                ?
                                    <ActivityIndicator size="large" color="#00ff00" /> 
                                :
                                <Text style={styles.buttonText}>Simpan</Text>
                        }
                    </TouchableOpacity>
                    <Spacer mr={5} ml ={5}/>
                    <TouchableOpacity style={styles.buttonCancel} onPress={() => buttonCancelPress()}>
                        <Text style={styles.buttonText}>Batal</Text>
                    </TouchableOpacity>
                </View>
            </Spacer>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        textAlign: 'center',
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#f3fcc2',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e29d1d'
    },
    inputContainer:{
        flex:1,
    },
    textArea:{
        textAlignVertical: 'top',
    },
    buttonContainer:{
        flexDirection: 'row',
        alignSelf: 'center'
    },
    buttonSave:{
        borderColor: '#5cb85c',
        backgroundColor: '#5cb85c',
        borderRadius: 5,
        width: '45%',
    },
    buttonCancel:{
        borderColor: '#fcb000',
        backgroundColor: '#fcb000',
        borderRadius: 5,
        width: '45%'
    },
    buttonText:{
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 20,
        height: 40
    }
});

export default NoteForm;