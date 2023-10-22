/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { Schema } from 'yup';
// Aula12.1 4:45 *** Não vou implementar assim pq como fiz na linha anterior funcionou ***
// import { ObjectSchema } from 'yup';

// 
// Aula12 14:55 - Importar o StatusCodes
import { StatusCodes } from 'http-status-codes';

// Aula12 14:58 - Importar ValidationError direto do yup
import { ValidationError } from 'yup';


// Aula12 21:55 - TProperty
type TProperty = 'body' | 'header' | 'params' | 'query';

// Aula12 22:40 - TAllSchemas
type TAllSchemas = Record< TProperty, Schema< any > >;

// Aula12 45:30 - Receber T = Generic, é uma tipagem que eu não sei ainda, é genérica...
type TGetSchema = <T>( schema : Schema< T > ) => Schema< any >;
// Aula12.1 4:45 *** Não vou implementar assim pq como fiz na linha anterior funcionou ***
// type TGetSchema = <T extends Maybe<AnyObject>>( schema : Schema< T > ) => Schema< any >;

// Aula12 47:00 
type TGetAllSchemas = ( getSchema : TGetSchema ) => Partial< TAllSchemas >;


// Aula12 09:40 - Criar type TValidation - Poderia usar a interface
// Aula12 14:20 - Receber schema
// type TValidation = ( scheme : Schema<any> ) => RequestHandler;
// type TValidation = ( scheme : Schema<RequestHandler> ) => RequestHandler;
// Aula12 19:00 - Passando field 
// type TValidation = ( scheme : Schema< any > ) => RequestHandler;
// type TValidation = ( field: 'body' | 'header' | 'params' | 'query', scheme : Schema< any > ) => RequestHandler;
// Aula12 21:55 - Type
// type TValidation = ( field: 'body' | 'header' | 'params' | 'query', scheme : Schema< any > ) => RequestHandler;
// Aula2 23:04
// type TValidation = ( schemas : Schema< any > ) => RequestHandler;
// Aula12 25:20 - Partial< TAllSchemas > Partial é um generic e nem todos os campos são obrigatórios
// type TValidation = ( schemas : TAllSchemas ) => RequestHandler;
// Aula12 48:00 - Não vai mais receber todos os schemas de uma vez - 
// type TValidation = ( schemas : Partial< TAllSchemas > ) => RequestHandler;
type TValidation = ( getAllSchemas : TGetAllSchemas ) => RequestHandler;

// // Aula12 09:40 - Criar type TValidation - Poderia usar a interface
/*
const validation : TValidation = () => {
    
    return async ( req, res, next ) => {
        console.log( 'teste' );
    };
};
*/
// Aula12 11:19 - Reduzir a função acima
// Aula12 14:00 - Receber schema
// Aula12 19:25 - Recebendo field
// const validation : TValidation = ( scheme ) => async ( req, res, next ) => {
// Aula12 26:47 - 
// const validation : TValidation = ( field, scheme ) => async ( req, res, next ) => {
// Aula12 51:30
// const validation : TValidation = ( schemas ) => async ( req, res, next ) => {
const validation : TValidation = ( getAllSchemas ) => async ( req, res, next ) => {

    const schemas = getAllSchemas( schema => schema );
    
    console.log( schemas );

    // Aula12 36:19
    // Aula12 36:19 - troço de doido 
    const errorsResult : Record< string, Record< string, string > > = {};


    // Aula12 31:10 - Object.entries (array de arrays )
    // Aula12 32:20 - 
    Object.entries( schemas ).forEach( ( [key, schema ] ) => {

        try {
            
            // Aula12 34:20 - ValidadeSync - Não retorna um promise, espera a validação acontecer para retornar um erro ou ok
            // schema.validate( req[ key as TProperty ], { abortEarly : false } );
            schema.validateSync( req[ key as TProperty ], { abortEarly : false } );
                
            // Aula12 35:00 - Comentar o next pq como não temos mais uma função assincrona isso vai causar um erro
            // return( next() );
    
        } catch( error ) {
            
            const yupError = error as ValidationError;
    
            const errors : Record< string, string > = {};
       
            yupError.inner.forEach( error => {
    
                if( error.path === undefined ) return;
                
                errors[error.path] = error.message;
            });
    
            // Aula12 14:55 - Importar o StatusCodes
            // Aula12 35:50 - Comentei para retornar o erro após o término de todas as validações
            // return( res.status( StatusCodes.BAD_REQUEST ).json( { errors: errors }) );
            // Aula12 40:15 
            // errorsResult[ key as TProperty ] = errors;
            errorsResult[ key ] = errors;
        }
        
    });
    
    // Se não houve erros
    if ( Object.entries( errorsResult ).length === 0 ) {
        
        return( next() );

    } else {
        
        return( res.status( StatusCodes.BAD_REQUEST ).json( { errors : errorsResult }) );
    }

    /*

    // Aula09 20:00
    try {
        // Aula12 14:40 - Trocar queryValidation por scheme
        // await queryValidation.validate( req.query, { abortEarly : false } );
        // Aula12 - 19;20 - Dizendo o que vou validar através do filed
        // await scheme.validate( req.query, { abortEarly : false } );

        await scheme.validate( req[ field ], { abortEarly : false } );

        // Vai executar o proximo handler da fila ( no router CidadesController.create )        
        return( next() );

    } catch( error ) {
        // Aula12 14:58 - Importar ValidationError direto do yup
        const yupError = error as ValidationError;

        // Aula10 07:30 - 
        const errors : Record< string, string > = {};

        // Aula10 0900
        yupError.inner.forEach( error => {

            // Aula10 12:50 - Valiar o error.path
            // if( !error.path ) return; ou 
            if( error.path === undefined ) return;
            
            errors[error.path] = error.message;
        });

        // Aula12 14:55 - Importar o StatusCodes
        return( res.status( StatusCodes.BAD_REQUEST ).json( {

            // Aula10 13:38 - message: yupError.message,
            errors: errors            
        }) );
    }
    */

};

export {validation};