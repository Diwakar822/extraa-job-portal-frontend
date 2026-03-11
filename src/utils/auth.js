
export const getToken =()=>{
     return localStorage.getItem("token");
};

export const logout =()=>{
    return localStorage.removeItem('token');
    window.location.href = "/login" 
}

