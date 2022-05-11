import SETTINGS from '../SETTINGS.js';

if (SETTINGS.IS_SUPER_SERVER) {
    // require('./living-processes/super/satellite-monitor.js'); //... living-processes
    // require('./living-processes/super/super-task-executor.js'); //... living-processes
};

if (SETTINGS.IS_SATELLITE) {
    // require('./living-processes/task-executor.js'); //............. living-processes
    // require('./living-processes/speaker-monitor.js'); //........... living-processes
    // require('./external-connections/assistants-hub.js'); //........... connect
};

export default null;
