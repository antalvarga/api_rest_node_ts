// Aula13 05:00 - Criar ../controllers/cidades/GetAll.ts
import { Request, RequestHandler, Response } from 'express';

import { validation } from '../../server/shared/middlewares';

import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';


interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation( ( getSchema ) => ( {
    query: getSchema<IQueryProps>( yup.object().shape({
        page: yup
            .number()
            .optional()
            .moreThan(0)
        , limit: yup
            .number()
            .optional()
            .moreThan(0)
        , filter: yup
            .string()
            .optional()
    })),
}));


const getAll : RequestHandler = async (req: Request < {}, {}, {}, IQueryProps >, res: Response ) => {

    console.log( req.query );

    return( res.status( StatusCodes.INTERNAL_SERVER_ERROR ).send( 'cidades : controllers : getAll :: ok' ) );

};


export { getAll };