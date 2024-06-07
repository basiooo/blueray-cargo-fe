import axios from "axios";
import { BASE_URL } from "../config";
export const login = async (data) => {
    try {
        const url = `${BASE_URL}/api/token/`
        const response  = await axios.post(url,data)
        if (response.status == 200){
            localStorage.setItem("access",response.data.access)
            localStorage.setItem("refresh",response.data.refresh)
            return {
                "success":true,
                "data": response.data
            }
        }
        return {
            "success": false,
            "errors": response.data
        }
    } catch (error) {
        return error
    }
}
export const registration = async (data) => {
    try {
        const url = `${BASE_URL}/api/register/`
        const response  = await axios.post(url,data)
        if (response.status == 201){
            return {
                "success":true,
            }
        }
        return {
            "success": false,
            "errors": response.data
        }
    } catch (error) {
        return error
    }
}