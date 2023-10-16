import express from 'express';


const server = express();


server.get( '/', ( req, res ) => {
    return ( res.send ( 'Obrigado Deus! Hello world - dev') );
} )


export { server };