import React, { useEffect, useState } from 'react';
import { deleteJob, getAdminJobs, updateJob } from '../api/jobApi';
import { DataType, Table } from 'ka-table';
import 'ka-table/style.css';
import { Briefcase, Edit3, Trash2, MoreVertical, Search, Plus, Check, X, AlertCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Dashboard from '../pages/Dashboard';



const columns =[
    {key:"title", title: "Title", dataType: DataType.String, isEditable: true, style:{ width :250 }},
    {key:"company", title: "Company", dataType: DataType.String, style:{ width:150 }},
    {key:"location", title: "Location", dataType: DataType.String, style:{ width:150 }},
    {key:"jobType", title: "JobType", dataType: DataType.String, style:{ width:150 }},
    {key:"salary", title: "Salary", dataType: DataType.String, style:{width:150}},
    {key:"description", title:"Description", dataType:DataType.String, style: { width: 250}},
    {key:"skillsRequired", title:"Skills", dataType:DataType.String, style:{width:150}},
    {key:"actions", title:"Actions", isEditable: false, style:{width:150}}

]

const AdminJobPanel = () => {

    const [jobs, setJobs] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [editingJob, setEditingJob] = useState(null);
    const navigate= useNavigate()

    useEffect(()=>{
           fetchJobs()
    },[])

    const fetchJobs = async()=>{
        try {
               const res= await getAdminJobs()
               setJobs(res.data.jobs)
               console.log(res.data.jobs)
        } catch (error) {
            console.log(error, 'somthing Went worng')
        }
    }

    const formattedJobs = jobs.map(job=>({
        ...job, 
        skillsRequired: Array.isArray(job.skillsRequired)
        ? job.skillsRequired.join(', ')
        : job.skillsRequired
    }))

    const handleDelete=async(id)=>{
        const confirmDelete=window.confirm("Are you sure you want to delete this job?")

        if(!confirmDelete) return;
        try {
            await deleteJob(id)
            toast.success('Job deleted successfully')
            fetchJobs()
        } catch (error) {
            toast.error('Could not delete job')
            console.log(error, 'something went worng')
        }
    }

    const handleUpdate =async(rowKeyField, rowData )=>{
        try {
            await updateJob(rowKeyField, rowData)
            toast.success("Job Updated Successfully")
            console.log("updated successfully")
            fetchJobs()
        } catch (error) {
            toast.error("Something went wrong!")
           console.log(error, 'something went worng')
        }

    }

    const toggleMenu=(id)=>{
        setOpenMenuId( openMenuId === id ? null : id)

    }

    const handleEdit =(job)=>{
      setEditingJob(job)
      setOpenMenuId(null)
    }

    return (
    <div className="min-h-screen bg-[#fafafb] lg:p-10 font-sans text-slate-900">
            {/* Header Section */}
            <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[#ffff22] bg-black w-fit px-3 py-1 rounded-lg mb-3">
                        <Briefcase size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Management</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">Admin Job Panel</h1>
                    <p className="text-slate-400 font-medium">Control and update your active listings with ease.</p>
                </div>
                {/* <NavLink to="CreatJob">
                <button className="bg-black text-[#ffff22] font-black px-6 py-4 rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-black/10">
                    <Plus size={20}/> POST NEW JOB
                </button>
                </NavLink> */}
            </header>

            {/* Table Container */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-visible">
                <div className="p-2">
                    <Table
                        columns={columns}
                        className="extraa-ka-table"
                        data={formattedJobs}
                        rowKeyField={'_id'}
                        editingMode={"cell"}
                        onCellValueChanged={async ({ rowKeyField, rowData }) => {
                            await handleUpdate(rowKeyField, rowData);
                        }}
                        childComponents={{
                            table: {
                                elementAttributes: () => ({ className: "w-full" })
                            },
                            headRow: {
                                elementAttributes: () => ({ className: "bg-slate-50/50" })
                            },
                            headCell: {
                                elementAttributes: () => ({
                                    className: "px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100"
                                })
                            },
                            row: {
                                elementAttributes: () => ({ className: "hover:bg-slate-50 transition-colors group" })
                            },
                            cell: {
                                elementAttributes: () => ({
                                    className: "px-6 py-5 text-sm border-b border-slate-50 whitespace-nowrap"
                                }),
                                content: (props) => {
                                    if (props.column.key === 'title') {
                                        return <span className="font-bold text-slate-800">{props.value}</span>;
                                    }
                                    if (props.column.key === 'description') {
                                        return <div className="truncate max-w-[250px] text-slate-400 font-medium">{props.value}</div>;
                                    }

                                    if(props.column.key === 'location'){
                                        return (
                                              <div className='truncate max-w-[200px] text-slate-400 font-medium'>
                                                             {props.value}
                                            </div>
                                        )
                                    }
                                    if (props.column.key === 'skillsRequired') {
                                        return (
                                            <div className="flex gap-1 overflow-hidden max-w-[200px]">
                                                {props.value.split(",").map((skill, i) => (
                                                    <span key={i} className="bg-slate-100 text-slate-600 text-[10px] px-1 py-1 rounded-lg border border-slate-200 uppercase tracking-tighter">
                                                        {skill.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        );
                                    }
                                    if (props.column.key === 'actions') {
                                        return (
                                            <div className="relative right-12 flex justify-center">
                                                <button 
                                                    onClick={() => toggleMenu(props.rowData._id)} 
                                                    className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-black cursor-pointer"
                                                >
                                                    <MoreVertical size={20} />
                                                </button>
                                                {openMenuId === props.rowData._id && (
                                                    <>
                                                    <div onClick={()=>setOpenMenuId(null)}></div>
                                                    <div className="absolute right-0 top-12 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                                                        <button 
                                                            onClick={() => handleEdit(props.rowData)}
                                                            className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl text-sm font-bold transition-colors"
                                                        >
                                                            <Edit3 size={16} /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(props.rowData._id)}
                                                            className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-sm font-bold transition-colors"
                                                        >
                                                            <Trash2 size={16} /> Delete
                                                        </button>
                                                    </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    }
                                    return props.value;
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {/* --- ADORABLE UPDATE MODAL --- */}
            {editingJob && (
                <div className="fixed inset-0 flex items-center justify-center p-6 z-[100]">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setEditingJob(null)} />
                    <div className="relative bg-white p-10 rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-10 duration-500">
                        <header className="mb-8">
                            <h3 className="text-3xl font-black tracking-tight mb-2">Update Job Position</h3>
                            <p className="text-slate-400 font-medium text-sm italic">Adjusting fields for "{editingJob.title}"</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: 'Title', name: 'title', type: 'text' },
                                { label: 'Company', name: 'company', type: 'text' },
                                { label: 'Location', name: 'location', type: 'text' },
                                { label: 'Salary', name: 'salary', type: 'text' },
                            ].map((field) => (
                                <div key={field.name} className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                                    <input
                                        type={field.type}
                                        value={editingJob[field.name]}
                                        onChange={(e) => setEditingJob({ ...editingJob, [field.name]: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#ffff22] focus:bg-white font-bold transition-all"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Type</label>
                            <select
                                value={editingJob.jobType || ''}
                                onChange={(e) => setEditingJob({ ...editingJob, jobType: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#ffff22] focus:bg-white font-bold transition-all appearance-none"
                            >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <div className="mt-6 space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                            <textarea
                                value={editingJob.description}
                                onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 min-h-[120px] outline-none focus:ring-2 focus:ring-[#ffff22] focus:bg-white font-medium transition-all"
                            />
                        </div>

                        <div className="mt-6 space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Skills Required</label>
                            <input
                                type="text"
                                value={editingJob.skillsRequired}
                                onChange={(e) => setEditingJob({ ...editingJob, skillsRequired: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#ffff22] focus:bg-white font-bold transition-all"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-10">
                            <button 
                                onClick={() => setEditingJob(null)}
                                className="px-6 py-2 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                                CANCEL
                            </button>
                            <button
                                onClick={async () => {
                                    await updateJob(editingJob._id, {
                                        ...editingJob,
                                        skillsRequired: editingJob.skillsRequired?.split(',').map((s) => s.trim())
                                    });
                                    toast.success("Job Updated Successfully!")
                                    setEditingJob(null);
                                    fetchJobs();
                                }}
                                className="px-1 py-1 bg-[#ffff22] text-black font-black rounded-2xl hover:bg-black hover:text-white transition-all shadow-lg shadow-yellow-500/10 flex items-center gap-2 cursor-pointer"
                            >
                                <Check size={20} /> SAVE CHANGES
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .extraa-ka-table { width: 100% !important; border: none !important; }
                .ka-thead-cell { padding: 1 !important; border: none !important; }
                .ka-cell { padding: 2 !important; border: none !important; }
                .ka-table { width: 100% !important; border-collapse: collapse !important; }
                .ka-thead-cell-content { padding: 10 !important; }
                
            `}</style>

            
        </div>

    );
};

export default AdminJobPanel;