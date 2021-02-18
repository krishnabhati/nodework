module.exports = (app) => {
    const { validateToken } = require("../auth/auth");
    const users = require('../controllers/user.controller.js');
    const { Joi, celebrate ,errors, Segments} = require("celebrate");

    // Create a new Note
     app.post('/signup',users.create);

    //celebrate({
    //     [Segments.BODY]: Joi.object().keys({
    //         username: Joi.string().length(6).required().label("Username"),
    //         fullname: Joi.string().required(),
    //         password : Joi.string().required(),
    //         email : Joi.string().email().required(),
    //         mobile : Joi.string().required(),
    //         countryCode : Joi.string().required()
    //     }),
    //     // [Segments.QUERY]: {
    //     //   token: Joi.string().token().required()
    //     // }
    // //   })
    // // ,celebrate({
    // //     headers: {
    // //         platform: Joi.number().required()
    // //     },
    // //     body: {
    // //         // location:Joi.object({
    // //         //     address:Joi.string().required(),
    // //         //     city:Joi.string(),
    // //         //     country:Joi.string().required() ,
    // //         //     street: Joi.string(),
    // //         //     state:Joi.string().required() ,
    // //         //     postalCode: Joi.string().required(),
    // //         // }),
            

    // //     }

    // })
    //  users.create);
    // Retrieve all Notes
    app.get('/getall', validateToken, users.findAll);
    app.post('/verifyotp', validateToken, users.verifyotp);


    // app.route("/user/getSimilarData").get(user.getSimilarData)

    // Retrieve a single Note with noteId
    app.post('/login', users.login);

    // Update a Note with noteId
    app.put('/notes/:noteId', users.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', users.delete);
}