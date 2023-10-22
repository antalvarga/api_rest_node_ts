/* eslint-disable @typescript-eslint/ban-types */
import { Request, RequestHandler, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';

// Aula12 06:00
import { validation } from '../../server/shared/middlewares';


// Aula08 10:35 - Testes
// export const xpto = {};

// Aula09 13:40 - Validação 
import * as yup from 'yup';


interface ICidade {
    nome: string;    
    estado: string;
}

// Aula09 14:10 
// Aula12 24:31 - Comentar bodyValidation
/* 
const bodyValidation : yup.Schema< ICidade > = yup.object().shape({
    nome: yup
        .string()
        .required( 'O nome é obrigatório' )
        .min(3, 'O nome deve ter mais de 3 caracteres' )
    , estado: yup
        .string()
        .required()
        .min(2)
});
*/
// Aula11 18:47 - interface
// AULA12 44:28 - limit
interface IFilter {
    filter?: string;
    // limit?: number;
}

// Aula11 18:15 - queryValidation
// Aula12 24:31 - Comentar queryValidation
/*
const queryValidation : yup.Schema< IFilter > = yup.object().shape({
    filter: yup
        .string()
        .required()
        .min(3)
});
*/

// Aula11 19:30
// Aula12 17:14 - Suprimir a createQueryValidator. Será substuido por createValidation 
/*
export const createQueryValidator : RequestHandler = async( req, res, next ) => {


    // Aula09 20:00
    try {
        await queryValidation.validate( req.query, { abortEarly : false } );

        // Vai executar o proximo handler da fila ( no router CidadesController.create )        
        return( next() );

    } catch( error ) {

        const yupError = error as yup.ValidationError;

        // Aula10 07:30 - 
        const errors : Record< string, string > = {};

        // Aula10 0900
        yupError.inner.forEach( error => {

            // Aula10 12:50 - Valiar o error.path
            // if( !error.path ) return; ou 
            if( error.path === undefined ) return;
            
            errors[error.path] = error.message;
        });


        return( res.status( StatusCodes.BAD_REQUEST ).json( {

            // Aula10 13:38 - message: yupError.message,
            errors: errors            
        }) );

    }
};
*/


// 06:00 middleware
// Aula12 17:30 - Sumprimir createBoddyValidator. Será substuido por createValidation
/*
export const createBoddyValidator : RequestHandler = async ( req, res, next ) => {

    // Aula09 20:00
    try {
        await bodyValidation.validate( req.body, { abortEarly : false } );

        // Vai executar o proximo handler da fila ( no router CidadesController.create )        
        return( next() );

    } catch( error  ) {

        const yupError = error as yup.ValidationError;

        // Aula10 07:30 - 
        const errors : Record< string, string > = {};

        // Aula10 0900
        yupError.inner.forEach( error => {

            // Aula10 12:50 - Valiar o error.path
            // if( !error.path ) return; ou 
            if( error.path === undefined ) return;
            
            errors[error.path] = error.message;
        });


        return( res.status( StatusCodes.BAD_REQUEST ).json( {

            // Aula10 13:38 - message: yupError.message,
            errors: errors            
        }) );

    }

};
*/

// Aula12 17:33 - createBodyValidation
// Aula12 20:00 - Passando o obj a ser validado
// export const createBodyValidator = validation( bodyValidation );

// Aula12 23:15 - Comentar a linha abaixo
// export const createBodyValidator = validation( 'body', bodyValidation );


// export const createValidation = validation();
// Aula12 06:00 - Criar createValidation
// Aula12 20:00 - Passando o obj a ser validado
// export const createValidation = validation( queryValidation );
// Aula12 23:15 - Comentar a linha abaixo
// export const createValidation = validation( 'query', queryValidation );
// Aula12 48:20 - Com a alteração NOVAMENTE do type TValidation é necessário alterar a createValidation
export const createValidation = validation( ( getSchema ) => ( {
    body: getSchema<ICidade>( yup.object().shape({
        nome: yup
            .string()
            .required()
            .min(3)
        , estado: yup
            .string()
            .required()
            .min(2)
    })),
    query: getSchema< IFilter >( yup.object().shape({
        filter: yup
            .string()
            .optional()
            .min(3),
    })),
}));


// Aula08 20:00
// const create = ( req: Request, res: Response ) => {
// Aula10 10:55
// const create = async ( req: Request<{},{}, ICidade >, res: Response ) => {
const create : RequestHandler = async ( req: Request<{},{}, ICidade >, res: Response ) => {

    // const data : ICidade = req.body;
    const data = req.body.nome;

    // console.log( data.nome );
    console.log( data );


    // Aula09 21:00
    //let validatedData : ICidade | undefined = undefined;

    // Aula11 05:43 - Recortou o try e criou o middleware createBoddyValidator
    console.log( req.body );
    
    return( res.send('cidades : controllers : create :: OK ') );
};

export { create } ;