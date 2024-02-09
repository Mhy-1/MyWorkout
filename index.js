// import { registerRootComponent } from 'expo';
// import App from './App';

// registerRootComponent(App);



import { AppRegistry } from 'react-native';
import App from './App';
import { name as App } from './app.json';

AppRegistry.registerComponent(App, () => App);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
