// Aula15 16:52 - Escrever jest.setup.js

import supertest from 'supertest';
// const supertest = require( 'supertest') (express); 

import {server} from '../src/server/Server';

const testServer = supertest( server );



export { testServer } ;