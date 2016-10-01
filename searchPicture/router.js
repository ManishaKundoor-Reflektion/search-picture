var ctrl = require('./controllers/searchPicture.js');

module.exports = function (app) {
    app.post('/api/searchPicture/upload', ctrl.sendPicture);
};