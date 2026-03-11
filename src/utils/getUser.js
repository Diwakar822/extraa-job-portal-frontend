import { jwtDecode } from "jwt-decode";

export const getUserFromToken =()=>{
    const token= localStorage.getItem("token")
    console.log(token)

    if(!token){
        return null
    }

    try {
        return jwtDecode(token)
    } catch {
        return null
    }
};

 