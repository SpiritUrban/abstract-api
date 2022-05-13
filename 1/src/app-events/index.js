const level = '../';
import { log } from '../my_modules/staff.js';

import events from 'events';
const EventEmitter = events.EventEmitter;

const appEvents = new EventEmitter();

export default appEvents;