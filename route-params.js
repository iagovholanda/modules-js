const http = require('http')
const { URL } = require('url')

const routes = require('./routes')

const server = http.createServer((request, response) => {
    const parsedUrl = new URL(`http://localhost:3000${request.url}`)

    let { pathname } = parsedUrl /* Retorna o mesmo endpoint */ 
    let id = null

     /* 
        Divide o endpoint e retorna um array. 
        filter((routeItem) => Boolean(routeItem) -> Campos vazios, sao considerados false.
        filter(Boolean)
    */

    const splitEndpoint = pathname.split('/').filter((routeItem) => Boolean(routeItem))

    /* Condicional de array retornado do endpoint com mais de um elemento. Ex: ['users', '3] */
    if(splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`
        id = splitEndpoint[1] /* Em route-params o id é a segundo elemento do array. */
    }


    console.log(Object.fromEntries(parsedUrl.searchParams))

    console.log(`Request Method: ${request.method} | Endpoint: ${pathname}`)

    const route = routes.find((routeObject) => (
        routeObject.endpoint === pathname && routeObject.method === request.method
    ))

    if(route) {
        request.query = Object.fromEntries(parsedUrl.searchParams) /* Injetando os dados na requisicao*/
        request.params = { id }

        /* Inclusao do response, para tratativas de retornos. */
        response.send = (statusCode, body) => {
            response.writeHead(statusCode, { 'Content-Type': 'text/html' })
            response.end(JSON.stringify(body))
        }

        route.handler(request, response)
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end(`Cannot ${request.method} ${pathname}`)
    }
})

server.listen(3000, () => {
    console.log('Server started at http://localhost:3000 🔥')
})