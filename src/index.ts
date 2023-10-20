import { server } from './server/Server';

// import * as dotenv from 'dotenv';
// dotenv.config();
import 'dotenv/config';


// const myPort = process.env.PORT || 3333;
const myPort = process.env.PORT ? process.env.PORT : 3333;



// server.listen( 3333, () => { 
server.listen( myPort, () => { 

    console.log( `Server is runing in port ${ myPort } ` ); 

} );

