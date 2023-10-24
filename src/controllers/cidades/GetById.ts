// Aula13 05:00 - Criar ../controllers/cidades/GetAll.ts
import { Request, RequestHandler, Response } from 'express';

import { validation } from '../../server/shared/middlewares';

import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';



interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation( ( getSchema ) => ( {
    params: getSchema<IParamProps>( yup.object().shape({
        id: yup
            .number()
            .integer()
            .required()
            .moreThan(0)
        , 
    })),
}));


const getById : RequestHandler = async (req: Request < IParamProps >, res: Response ) => {

    console.log( req.params );

    return( res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send( 'cidades : controllers : getById :: ok' ) );

};


export { getById };