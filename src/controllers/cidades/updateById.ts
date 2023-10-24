// Aula13 05:00 - Criar ../controllers/cidades/GetAll.ts
import { Request, RequestHandler, Response } from 'express';

import { validation } from '../../server/shared/middlewares';

import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';


interface IParamProps {
    id?: number;
}
interface IBodyProps {
    nome: string;
}

export const updateByIdValidation = validation( getSchema => ({
    body: getSchema< IBodyProps >( yup.object().shape({
        nome: yup
            .string()
            .required()
            .min(3),
    })),
    params: getSchema< IParamProps >( yup.object().shape({
        id: yup
            .number()
            .integer()
            .required()
            .moreThan(0),
    }))
}));



const updateById: RequestHandler = async ( req: Request< IParamProps, {}, IBodyProps >, res: Response ) => {

    console.log( req.params );
    console.log( req.body );

    return( res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send( 'cidades : controllers : updateById :: ok' ) );

};


export { updateById } ;