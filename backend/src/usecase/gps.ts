import {
    GpsRepository as GpsRepo,
    GpsData,
    CountData
} from '../domain/gpsRepo'

import { DefaultResponse, createResponse } from '../pkg/response/response'
import { responseCode } from '../pkg/response/code'

interface DeviceDetail {
    gpsData:GpsData[],
    percentage:CountData[]
}

export default class GpsService {
    private gpsRepo: GpsRepo

    constructor(gpsRepo: GpsRepo) {
        this.gpsRepo = gpsRepo
    }

    async findAllDeviceId(): Promise<DefaultResponse> {
        try {
            const Gps = this.gpsRepo
            let resp: DefaultResponse = createResponse(responseCode.SUCCESS, "success", null)
            const listDeviceId = await Gps.findAllDeviceId()
            resp.data = listDeviceId
            return resp
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

    async findDetailDevice(deviceId:string): Promise<DefaultResponse> {
        try {
            const Gps = this.gpsRepo
            let data:DeviceDetail = {
                gpsData: [],
                percentage: []
            }
            let resp: DefaultResponse = createResponse(responseCode.SUCCESS, "success", data)
            const gpsDetail = await Gps.findByDeviceId(deviceId)
            const percentage = await Gps.countLocationPercentage(deviceId)
            if(gpsDetail.length && percentage.length) {
                data = {
                    gpsData : gpsDetail,
                    percentage
                }
                resp.data = data
            }
            return resp
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }
}