import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { applyJob } from '../api/applicationApi';
import JobApplicationSuccessModel from '../components/JobApplicationSuccessModel';
import { ArrowLeft, ArrowRight, FileText, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ApplyJob = () => {

    const {id}=useParams()
    const { state }= useLocation();

    const navigate= useNavigate();

    const [form,setForm]=useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    education: "",
    coverLetter: "",
    })
    const [resume, setResume]=useState(null)
    const [loading, setloading]=useState(false)
    const [message, setMessage]=useState('');
    const [showSuccess, setshowSuccess]=useState(false);

    
    const handleChange=(e)=>{

        setForm({...form, [e.target.name]: e.target.value })

    } 

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!resume){
            return setMessage("Resume is required")
        }

        const formData=new FormData();
        formData.append("jobId", id);
        Object.keys(form).forEach((key)=>{
              formData.append(key, form[key]);
        })
        formData.append("resume", resume)
        
        for(let [key, value] of formData.entries()){
            console.log(key, value)
        }
        try {
            setloading(true);
            const res= await applyJob(formData);
            setMessage(res.data.message);
            
            setshowSuccess(true)
            
        } catch (error) {
            console.log("Find the error:",error)
            toast.error('You Already applied for this job')
            setMessage(error.response?.data?.message || "Apply Faild")
        }finally{
            setloading(false)
        }

    }   

    const Label=({children})=>(
          <label className='block text-[10px] font-black text-black uppercase tracking-[2px] mb-2'>{children}</label>
    )

    console.log("here the data:", state?.jobTitle)

    return (

        <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-slate-900">

 {/* 1. Header Section */}

<div className="bg-white px-6 py-6 flex items-center justify-between border-b border-slate-100"> 
<button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
 <ArrowLeft size={24} /> </button> <div className="text-center"> 
<h1 className="text-sm font-black uppercase tracking-widest text-slate-400">{state?.jobTitle}</h1> 
<p className="text-[10px] font-bold text-slate-300 uppercase mt-1">Step 1</p> </div>
<div className="w-10" /> {/* Spacer */} </div> 

{/* 2. Progress Bar */} 

<div className="px-6 py-4 bg-white border-b border-slate-50"> 
<div className="flex justify-between items-center mb-2"> 
<span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Application Progress</span>
<span className="text-[10px] font-black text-slate-900">50%</span> 
</div> <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"> 
<div className="h-full bg-[#ffff22] w-1/2 rounded-full" /> 
</div> 
</div> 

<main className="flex-1 px-6 py-8">

 {/* 3. Form Card */} 

<div className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50">

<header className="mb-10">

<h2 className="text-2xl font-black tracking-tight mb-2 uppercase">Personal Information</h2>
<p className="text-slate-400 text-sm font-medium">Please fill in your details as they appear on your ID.</p> 
</header> 

<form onSubmit={handleSubmit} className="space-y-8">



<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

<div> <Label>First Name</Label> 
<input name='fullName' placeholder='FUll Name' onChange={handleChange} className='w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 placeholder:text-slate-300 uppercase' required />
</div> 

<div> <Label>Last Name</Label> 
<input name='LastName' placeholder='Last Name' onChange={handleChange} className='w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 placeholder:text-slate-300 uppercase'/>
</div> 

<div> 
<Label>Email Address</Label> 
<input name='email' type='email' placeholder='HELLO@EXTRAA.TECH' onChange={handleChange} className='w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 placeholder:text-slate-300 uppercase' required />
</div> 

<div> 
<Label>Phone Number</Label> 
<input name='phone' placeholder='+91 00000 00000' onChange={handleChange} className='w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 placeholder:text-slate-300' required />
</div>

<div> 
<Label>How Many Years of Experience</Label> 
<input name='experience' placeholder='Experience Level' onChange={handleChange} className='w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 placeholder:text-slate-300' required />
</div>

<div> 
<Label>Skills</Label> 
<input name='skills' placeholder='Skills (comma separated)' onChange={handleChange} className='w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 placeholder:text-slate-300' required />
</div>

<div> 
<Label>Education</Label> 
<input name='education' placeholder='Qualifiction' onChange={handleChange} className='w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 placeholder:text-slate-300' required />
</div>

<div> 
<Label>CoverLetter</Label> 
<textarea name='coverLetter' placeholder='CoverLetter' onChange={handleChange} className='w-full bg-[#F3F4F6] border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 placeholder:text-slate-300' required />
</div>




</div>

{/* Attach Resume Box */}
<div>
<Label>Attach Resume/CV</Label> 
<div className={`relative border-2 border-dashed rounded-[32px] p-10 transition-all flex flex-col items-center justify-center text-center ${resume ? 'border-green-500 bg-green-50/20' : 'border-[#ffff22] bg-white'}`}>

<input type='file' accept='.pdf' onChange={(e) => setResume(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" required />
 
<div className="bg-[#ffff22] text-black p-4 rounded-2xl mb-4 shadow-lg shadow-yellow-500/20"> <FileText size={32} /> </div>
<p className="font-black text-slate-900 text-sm uppercase tracking-wider"> {resume ? resume.name : "Click to Upload Resume"} </p> 
<p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">PDF ONLY • MAX 5MB</p> 
</div>

</div>

{message && !showSuccess && ( 
<p className="text-center text-red-500 text-xs font-black uppercase tracking-widest animate-pulse"> {message} </p>
)} 

</form> 
</div> 
</main> 

{/* 4. Footer Submit Button */}
<div className="p-6 bg-white border-t border-slate-50">
<button onClick={handleSubmit} disabled={loading} className="w-full bg-[#ffff22] hover:bg-black hover:text-white text-black font-black py-5 rounded-2xl shadow-xl shadow-yellow-500/10 flex items-center justify-center gap-4 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer" >

 {loading ? ( <Loader2 className="animate-spin" /> ) : ( <> 
 <span className="uppercase tracking-[3px]">Submit Application</span> 
 <ArrowRight size={20} />
  </> 
)} 
</button>
</div> 
<JobApplicationSuccessModel isvisible={showSuccess} message={message} /> 

</div> 

);   
};

export default ApplyJob;