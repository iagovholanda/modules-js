const UserController = require('./controllers/UserController')

module.exports = [
    {
        endpoint: "/users",
        method: "GET",
        handler: UserController.listUsers /* Funcao que desejo executar toda vez que a rota for chamada. */
    },
    {
        endpoint: "/users/:id",
        method: "GET",
        handler: UserController.getUserById /* Funcao que desejo executar toda vez que a rota for chamada. */
    },
    {
        endpoint: "/users",
        method: "POST",
        handler: UserController.createUser /* Funcao que desejo executar toda vez que a rota for chamada. */
    },
    {
        endpoint: "/users/:id",
        method: "PUT",
        handler: UserController.updateUser /* Funcao que desejo executar toda vez que a rota for chamada. */
    },
    {
        endpoint: "/users/:id",
        method: "DELETE",
        handler: UserController.deleteUser /* Funcao que desejo executar toda vez que a rota for chamada. */
    },
]