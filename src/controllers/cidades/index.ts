import * as deleteById from './deleteById';
import * as updateById from './updateByid';
import * as create from './Create';
// Aula13 09:20 - Alterar ../controllers/cidades/index.ts
import * as getAll from './GetAll';
import * as getById from './GetById';



export const CidadesController = {
    ...deleteById,
    ...updateById,
    // Aula14 04:45
    ...getById,
    ...create,
    // Aula13 09:20 
    ...getAll,  
};


// export  { CidadesController };