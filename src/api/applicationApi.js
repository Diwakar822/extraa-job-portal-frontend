import axios from "axios";


const API=axios.create({
    baseURL: "http://localhost:5000/api",
})

API.interceptors.request.use((req)=>{
  const token= localStorage.getItem("token");
  if(token){
    req.headers.Authorization= `Bearer ${token}`;
  }
  return req;
})


export const applyJob = (formData) =>
    API.post('/application/apply', formData)

export const application=()=>
  API.get('/application/my')

export const applicationById=(id)=>

  API.get(`/application/my/${id}`)


