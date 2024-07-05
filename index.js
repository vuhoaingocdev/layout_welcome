/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Welcome from './screens/welcome';
import MyCalendar from './components/candelar';

AppRegistry.registerComponent(appName, () => MyCalendar);
