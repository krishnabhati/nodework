module.exports = (app) => {
    const room = require('../controllers/room.controller');

    // Create a new room
    app.post('/createroom', room.roomcreate);
    
   
}