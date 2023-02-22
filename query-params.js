const http = require('http')
const { URL } = require('url')

const routes = require('./routes')

const server = http.createServer((request, response) => {
    const parsedUrl = new URL(`http://localhost:3000${request.url}`)

    const { pathname } = parsedUrl

    /* 
        URL searchParams -> Pegar as informcações query params. Tipo Iterable, onde tem que ser convertido
        para um objeto Javascript. O Object.fromEntries vai converter o iterable em um objeto javascript.
    */

    console.log(Object.fromEntries(parsedUrl.searchParams))

    console.log(`Request Method: ${request.method} | Endpoint: ${pathname}`)

    const route = routes.find((routeObject) => (
        routeObject.endpoint === pathname && routeObject.method === request.method
    ))

    if(route) {
        request.query = Object.fromEntries(parsedUrl.searchParams) /* Recebendo o objeto JS para os queryParams */
        route.handler(request, response) /* handler -> Metodo que esta sendo executado do controller */
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end(`Cannot ${request.method} ${pathname}`)
    }
})

server.listen(3000, () => {
    console.log('Server started at http://localhost:3000 🔥')
})