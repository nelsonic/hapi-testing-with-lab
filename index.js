var Hapi = require("hapi");
var server = new Hapi.Server(8080);
var database = require("./database.json");

server.route({
    path: "/users",
    method: "GET",
    handler: function(request, reply) {
		reply(Object.keys(database));
    }
});

if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}
module.exports = server;