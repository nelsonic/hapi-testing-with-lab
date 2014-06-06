var Hapi = require("hapi");
var Joi = require("joi");
var server = new Hapi.Server(8080);
var database = require("./database.json");

server.route({
    path: "/users",
    method: "GET",
    handler: function(request, reply) {
		reply(Object.keys(database));
    }
});

server.route({
    path: "/users/{username}",
    method: "GET",
    config: {
        validate: {
            path: { username: Joi.string().token() }
        },
        handler: function(request, reply) {
            if (database[request.params.username]) {
                reply(database[request.params.username]);
            } else {
                reply(Hapi.error.notFound("User not found."));
            }
        }
    }
});
 
server.route({
    path: "/users/{username}",
    method: "PUT",
    config: {
        validate: {
            path: { username: Joi.string().token() },
            payload: {
                full_name: Joi.string(),
                age: Joi.number().integer(),
                image: Joi.string()
            }
        },
        handler: function(request, reply) {
            if (!database[request.params.username]) {
                database[request.params.username] = request.payload;
                database[request.params.username].count = 0;
                reply(database[request.params.username]);
            } else {
                reply(Hapi.error.conflict("User already exists."));
            }
        }
    }
});
 
server.route({
    path: "/users/{username}",
    method: "DELETE",
    config: {
        validate: {
            path: { username: Joi.string().token() }
        },
        handler: function(request, reply) {
            if (!database[request.params.username]) {
                reply(Hapi.error.notFound("User not found."))
            } else {
                delete database[request.params.username];
                reply({result: "success"});
            }
        }
    }
});

if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}
module.exports = server;