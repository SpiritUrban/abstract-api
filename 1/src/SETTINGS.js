const self = {
    IS_SUPER_SERVER: true,
    IS_SATELLITE: true,
    SUPER_SERVER_URL: 'http://localhost',
    ADMIN_ROLES: ['superadmin', 'main-admin', 'admin'],
    ADMIN_SESSION_DURATION: { AMOUNT: 8, UNITS: 'hours' }, // 'hours' 'seconds'
    // ADMIN_SESSION_DURATION: { AMOUNT: 20, UNITS: 'seconds' }, // 'hours' 'seconds'
};

// module.exports = self;
export default self;
