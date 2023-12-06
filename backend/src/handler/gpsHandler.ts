import { FastifyRequest, FastifyReply } from 'fastify';
import Container from '../container';
import { DefaultResponse } from '../pkg/response/response';

export default class GpsHandler {
    private container: Container;
    constructor(container: Container) {
        this.container = container
         // Bind the methods to the instance to ensure 'this' refers to the instance
         this.handleListDeviceIdReq = this.handleListDeviceIdReq.bind(this);
         this.handleDetailDeviceReq = this.handleDetailDeviceReq.bind(this);
    }

    async handleListDeviceIdReq(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            // handling list device id request
            const gpsService = this.container.gpsService
            const response: DefaultResponse = await gpsService.findAllDeviceId()
            reply.send(response);
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }

    async handleDetailDeviceReq(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        // handling list device id request
        // type assertion for getting deviceId from unknown request.query
        const queryParams = request.query as { deviceId?: string };

        // Get the device ID from the query parameters
        const deviceId: string | undefined = queryParams.deviceId;

        if (!deviceId) {
            // Handle the case where the device ID is not provided
            reply.status(400).send({ error: 'Device ID is required in query params' });
            return;
        }
        try {
            const gpsService = this.container.gpsService
            const response: DefaultResponse = await gpsService.findDetailDevice(deviceId)
            reply.send(response);
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }
}