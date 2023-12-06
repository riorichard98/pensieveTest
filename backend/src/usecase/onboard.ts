import { UserRepository as UserRepo } from "../domain/userRepo";

import { DefaultResponse, createResponse } from '../pkg/response/response'
import { responseCode } from '../pkg/response/code'
import { getEnv } from "../utils/getEnv";

import { compare as bcryptCompare } from "bcrypt";
import { sign as jwtSign } from 'jsonwebtoken';

interface LoginResp {
    token: string;
}

export interface LoginReq {
    email: string;
    password: string
}

export default class OnboardService {
    private userRepo: UserRepo

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo
    }

    async login(loginReq: LoginReq): Promise<DefaultResponse> {
        try {
            const User = this.userRepo
            let resp: DefaultResponse = createResponse(responseCode.SUCCESS, "success", null)
            if(loginReq?.email === undefined || loginReq?.password === undefined){
                resp = createResponse(responseCode.BAD_REQUEST, "email and password is required", null)
                return resp
            }
            const userFound = await User.findUserByEmail(loginReq.email)
            if (!userFound.length) {
                resp = createResponse(responseCode.BAD_REQUEST, "invalid email", null)
                return resp
            }
            const passwordValid: boolean = await bcryptCompare(loginReq.password, userFound[0].password)
            if (!passwordValid) {
                resp = createResponse(responseCode.BAD_REQUEST, "invalid password", null)
                return resp
            }
            // need to hide the password
            userFound[0].password = ""
            const expiresIn = 24 * 60 * 60; // 24 hours in seconds
            const jwtSecretKey = getEnv("JWT_SECRET_KEY")
            const token: string = jwtSign(userFound[0], jwtSecretKey, { expiresIn })
            const reponseData: LoginResp = {
                token
            }
            resp.data = reponseData
            return resp
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }
}