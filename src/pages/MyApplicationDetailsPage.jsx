import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applicationById } from '../api/applicationApi';
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, Clock, FileText, GraduationCap, IndianRupee, Mail, MapPin, Phone, User } from 'lucide-react';

const MyApplicationDetailsPage = () => {

    const {id}=useParams()
    const [application, setApplication]=useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        HandleDetails()
    },[])

    const HandleDetails= async ()=>{
        try {
            const res = await applicationById(id)
            setApplication(res.data.appliedJob)
            console.log(res.data.appliedJob)
            
        } catch (error) {
            console.error('find the error', error)
        } finally{
            setLoading(false)
        }

    }

    const { jobId } = application;

    if (loading) return <div className="p-10 text-center">Loading details...</div>;
    if (!application) return <div className="p-10 text-center">No application found.</div>;
    return (
       <div className="min-h-screen bg-slate-50 p-4 md:p-10">
            <div className="max-w-5xl mx-auto">
                
                {/* Back Button */}
                <Link to="/my-applications" className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Applications
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Job Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{jobId.title}</h1>
                                    <p className="text-lg text-blue-600 font-semibold mt-1">{jobId.company}</p>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold self-start ${
                                    application.status === 'pending' 
                                    ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                }`}>
                                    {application.status === 'pending' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                    {application.status.toUpperCase()}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="p-2 bg-slate-100 rounded-lg"><MapPin className="w-5 h-5" /></div>
                                    <div><p className="text-xs text-slate-400 uppercase font-bold">Location</p><p className="font-medium">{jobId.location}</p></div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="p-2 bg-slate-100 rounded-lg"><Briefcase className="w-5 h-5" /></div>
                                    <div><p className="text-xs text-slate-400 uppercase font-bold">Job Type</p><p className="font-medium">{jobId.jobType}</p></div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="p-2 bg-slate-100 rounded-lg"><IndianRupee className="w-5 h-5" /></div>
                                    <div><p className="text-xs text-slate-400 uppercase font-bold">Salary</p><p className="font-medium">{jobId.salary}</p></div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="p-2 bg-slate-100 rounded-lg"><Calendar className="w-5 h-5" /></div>
                                    <div><p className="text-xs text-slate-400 uppercase font-bold">Date Applied</p><p className="font-medium">{new Date(application.createdAt).toLocaleDateString()}</p></div>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-6">
                                <h3 className="text-lg font-bold text-slate-800 mb-3">Job Description</h3>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{jobId.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Applicant Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-10">
                            <div className="bg-slate-900 p-4 text-white flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <h3 className="font-bold">Applicant Profile</h3>
                            </div>
                            
                            <div className="p-6 space-y-5">
                                <div className="flex gap-4">
                                    <User className="w-5 h-5 text-slate-400" />
                                    <div><p className="text-xs text-slate-400 font-bold uppercase">Name</p><p className="text-slate-800 font-medium">{application.fullName}</p></div>
                                </div>
                                <div className="flex gap-4">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                    <div className="overflow-hidden"><p className="text-xs text-slate-400 font-bold uppercase">Email</p><p className="text-slate-800 font-medium truncate">{application.email}</p></div>
                                </div>
                                <div className="flex gap-4">
                                    <Phone className="w-5 h-5 text-slate-400" />
                                    <div><p className="text-xs text-slate-400 font-bold uppercase">Phone</p><p className="text-slate-800 font-medium">{application.phone}</p></div>
                                </div>
                                <div className="flex gap-4">
                                    <GraduationCap className="w-5 h-5 text-slate-400" />
                                    <div><p className="text-xs text-slate-400 font-bold uppercase">Education</p><p className="text-slate-800 font-medium">{application.education}</p></div>
                                </div>
                                <div className="flex gap-4">
                                    <Briefcase className="w-5 h-5 text-slate-400" />
                                    <div><p className="text-xs text-slate-400 font-bold uppercase">Experience</p><p className="text-slate-800 font-medium">{application.experience} Years</p></div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <a 
                                        href={`https://job-port-backend.onrender.com/${application.resume}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-100"
                                    >
                                        <FileText className="w-5 h-5" />
                                        View Resume
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyApplicationDetailsPage;