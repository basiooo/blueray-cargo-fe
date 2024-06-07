import { BASE_URL } from "../config"
import axios from "axios"

export const calculation = async (data) => {
    try {
        const url = `${BASE_URL}/api/calculation/`
        const token = localStorage.getItem('access')
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        const response  = await axios.post(url,data=data,{headers}) 
        if (response.status == 200){
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

export const get_cities = async () => {
    try {
        const url = `${BASE_URL}/api/destination/`
        const token = localStorage.getItem('access')
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        const response  = await axios.get(url,{headers})        
        if (response.status == 200){
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
export const get_countries = async () => {
    try {
        const token = localStorage.getItem('access')
        const url = `${BASE_URL}/api/countries/`
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        const response  = await axios.get(url,{headers})
        if (response.status == 200){
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
export const get_products = async (country_id) => {
    try {
        const token = localStorage.getItem('access')
        const url = `${BASE_URL}/api/categories/?country_id=${country_id}`
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        const response  = await axios.get(url,{headers})
        if (response.status == 200){
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