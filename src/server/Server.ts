import express from 'express';

import './services/TranslationsYup';


// Aula05 06:20
import { router } from '../routes';


const server = express();


// interface Teste {
// }


// Aula 05 5:40
// Transferir para o router/index.ts
// server.get( '/teste', ( req, res ) => {
//     return ( res.send ( 'Obrigado Deus! Hello world - dev') );
// } );


server.use( express.json() );

server.use( router );




export { server };