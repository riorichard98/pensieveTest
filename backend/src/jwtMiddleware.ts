import { FastifyRequest, FastifyReply } from 'fastify';
import * as jwt from 'jsonwebtoken';
import { getEnv } from "./utils/getEnv";
import { UserData } from 'domain/userRepo';

// need to extend the FastifyRequest in order to forward the token data 
interface CustomFastifyRequest extends FastifyRequest {
    user?: UserData; // Replace 'any' with the actual type of your user data
}

// JwtPayload type representing the decoded token
interface JwtPayload {
    user_id: number;
    name: string;
    email: string;
    password: string;
    login_token: string;
    iat: number;
    exp: number;
}


// Middleware to check the token
export const checkTokenMiddleware = async (request: CustomFastifyRequest, reply: FastifyReply) => {
    // Skip token verification for the /ping route
    if (!request.routeOptions.url){
        reply.send("service up and running....")
        return
    }
    if (request.routeOptions.url === '/ping' || request.routeOptions.url.includes('onboard')) {
        return;
    }
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        reply.status(401).send({ error: 'Unauthorized: Bearer Token is missing or invalid' });
        return;
    }

    const token = authorizationHeader.slice('Bearer '.length);

    try {
        // Verify the JWT
        const jwtSecretKey = getEnv("JWT_SECRET_KEY");
        const decodedToken = jwt.verify(token, jwtSecretKey) as JwtPayload;

        // Check if the token has expired
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp < currentTimeInSeconds) {
            // Token has expired
            reply.status(401).send({ error: 'Unauthorized: Token has expired' });
            return;
        }

        // Attach the decoded token to the request for further use in the route handler
        request['user'] = decodedToken;

        // If the token is valid, you can proceed with the request
    } catch (error) {
        // If the token verification fails
        reply.status(401).send({ error: 'Unauthorized: Invalid token' });
        return;
    }
};