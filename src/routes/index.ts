import { Router } from 'express';

import { StatusCodes } from 'http-status-codes';

import { CidadesController } from '../controllers';



const router = Router();


router.get( '/', ( req, res ) => {
    return ( res.send ( 'Obrigado Deus! Testei o Hello world - dev') );
} );


/*
router.get( '/teste', ( req, res ) => {
    return ( res.send ( 'Obrigado Deus! Hello world - dev') );
} );


router.post( '/teste', ( req, res ) => {
    console.log( req.body );

    // Aula5 17:20 
    // router.post( '/teste/:id' );
    // console.log( req.params );
    // return ( res.send ( `Teste - post :: ${ req.body }` ) );
    // return ( res.send ( req.body ) );
    // StatusCodes.UNAUTHORIZED somente teste
    return ( res.status( StatusCodes.UNAUTHORIZED ).json ( req.body ) );
} );

*/


// Aula08 14:25
// Aula11 14:28 - Passando CidadesController.createBoddyValidator
router.post( '/cidades'
    // Aula12 27:35 - Remmover createBodyValidator
    // , CidadesController.createBodyValidator
    // Aula12 16:17 - Substiruir createQueryValidator por createValidation
    // , CidadesController.createQueryValidator
    , CidadesController.createValidation
    , CidadesController.create 
);






export { router };
