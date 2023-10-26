// Aula16 08:35 - Criar arquivo Create.test.ts

// Aula16 11:45
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


// Aula16 09:05 - describe

describe( 'Cidades - Create', () => {

    // Aula16 10:40
    it( 'Criar registro', async () => {
        
        const res1 = await testServer
            .post( '/cidades' )
            .send( { nome: 'Caxias do Sul' } );

        console.clear;
        // console.log( res1.statusCode ); 

        // expect( res1.statusCode ).toEqual( StatusCodes.BAD_REQUEST );
        expect( res1.statusCode ).toBe( StatusCodes.CREATED );
        // expect( 1+2 ).toEqual(3);

        expect( typeof res1.body ).toEqual( 'number' );

    });

    // Aula16 26:20 
    it( 'Não pode criar um registro com nome curto', async () => {

        const res1 = await testServer
            .post( '/cidades' )
            .send( {nome: 'Ca'});

        expect( res1.statusCode ).toEqual( StatusCodes.BAD_REQUEST );
        expect( res1.body ).toHaveProperty( 'errors.body.nome' );
    });
});


/*
test( 'somar 1+2', () => {
    expect( 1+2).toBe(3);
} ) ;
*/

