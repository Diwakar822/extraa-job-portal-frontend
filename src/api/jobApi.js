import axios from "axios";


const API= axios.create({
    baseURL:"http://localhost:5000/api"
})


API.interceptors.request.use((req)=>{
    const token=localStorage.getItem('token')

    if(token){
        req.headers.Authorization=`bearer ${token}`
    }

    return req;
})  

export const createJob =(data)=>
      API.post("/jobs/create", data)

export const getAdminJobs=()=> API.get("/jobs/jobs")
export const updateJob=(id,data)=> API.put(`/jobs/${id}`, data)
export const deleteJob =(id)=>API.delete(`/jobs/${id}`)
