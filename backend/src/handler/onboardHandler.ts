import { FastifyRequest, FastifyReply } from 'fastify';
import Container from '../container';
import { DefaultResponse } from '../pkg/response/response';

import { LoginReq } from '../usecase/onboard';
export default class OnboardHandler {
    private container: Container;
    constructor(container: Container) {
        this.container = container

        this.handleLoginReq = this.handleLoginReq.bind(this);
    }

    async handleLoginReq(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        // Extracting data from the request body
        const requestBody = request.body as LoginReq;
        try {
            const onboardService = this.container.onboardService
            const response: DefaultResponse = await onboardService.login(requestBody)
            reply.send(response);
        } catch (error) {
            console.log(error);
            throw (error);
        }
    }

}