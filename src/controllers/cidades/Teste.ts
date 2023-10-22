import { Request, Response } from 'express';


const Teste = ( req: Request, res: Response ) => {


    return( res.send('Teste!') );
};

export { Teste } ;