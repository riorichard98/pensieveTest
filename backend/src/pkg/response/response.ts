export interface DefaultResponse{
    status:string;
    message:string;
    data:any;
}

export function createResponse(status:string,message:string,data:any): DefaultResponse{
    return {
        status,
        message,
        data
    }
}