import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import NoteCreateScreen from './src/screens/NoteCreateScreen';
import NoteDetailScreen from './src/screens/NoteDetailScreen';
import NoteListScreen from './src/screens/NoteListScreen';
import NoteEditScreen from './src/screens/NoteEditScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as NoteProvider} from './src/context/NoteContext';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {setNavigator} from './src/navigationRef';

import {FontAwesome} from '@expo/vector-icons';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};


const NoteListFlow = createStackNavigator({
  NoteList: NoteListScreen,
  NoteDetail: NoteDetailScreen,
  NoteEdit: NoteEditScreen,
})

NoteListFlow.navigationOptions = {
  title: 'Catatan',
  tabBarIcon: ({ tintColor }) => <FontAwesome name="th-list" size={20} color={tintColor}/>
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createMaterialBottomTabNavigator({
    NoteListFlow: NoteListFlow,
    NoteCreate: NoteCreateScreen,
    Account: AccountScreen
  },  
  {
    activeColor: 'white',
    inactiveColor: 'black',
    barStyle: { backgroundColor: 'rgb(117,109,255)' },
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NoteProvider>
          <App ref={(navigator) => {setNavigator(navigator)}} />
        </NoteProvider>
      </AuthProvider>
    </PaperProvider>
  );
}