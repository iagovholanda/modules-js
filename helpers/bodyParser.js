function bodyParser(request, callback) {
    let body = ''
        
    /*
        Recebe a informacao que esta chegando do usuario
    */
    request.on('data', (chunk) => {
        body += chunk
    })

    /* Terminou de receber as mensagens */
    request.on('end', () => {
        body = JSON.parse(body)
        request.body = body
        callback()
    })
}


module.exports = bodyParser
