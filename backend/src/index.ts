
import fastify from 'fastify';
import dotenv from 'dotenv';
import OnboardHandler from './handler/onboardHandler';
import GpsHandler from './handler/gpsHandler';
import Container from './container';
import {checkTokenMiddleware} from './jwtMiddleware'

// Load environment variables from .env file
dotenv.config();

const app = fastify();

async function start() {
    const container = new Container();
    await container.init();

    const gpsHandler = new GpsHandler(container);
    const onboardHandler = new OnboardHandler(container);
    app.get('/ping',(_request, reply)=>{
        reply.send("service up and running....")
    })
    
    // add middleware before hitting any endpoint except ping
    app.addHook('preHandler', checkTokenMiddleware);
    // gps routes
    app.get('/gps/devices', gpsHandler.handleListDeviceIdReq);
    app.get('/gps/device', gpsHandler.handleDetailDeviceReq);

    // onboard routes
    app.post('/onboard/login', onboardHandler.handleLoginReq);
    await app.listen({port:container.appConf.appPort,host:container.appConf.appAddress});
    console.log(`service ${container.appConf.appAddress} is running`)
    console.log(`Server is running on http://${container.appConf.appAddress}:${container.appConf.appPort}`);
}

start();