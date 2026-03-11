import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import $ from "jquery"
import DataTable from "datatables.net-dt";
import "datatables.net-columncontrol-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-columncontrol-dt/css/columnControl.dataTables.css";
import { Sun, Moon, Briefcase, Users, Clock, Search } from 'lucide-react';

const Dashboard = ({onmessage}) => {

    const [data, setdata]=useState([])
    const [darkMode, setDarkMode] = useState(false);
    const [message, setmessage]=useState({})
    const [jobs, setjobs]=useState([])
    const tableRef= useRef(null)

    const StatCard = ({ label, val, icon }) => (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">{icon}</div>
            <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold">{val}</p>
            </div>
        </div>
    );

    useEffect(()=>{
       handleJobs()
    },[])

    const handleJobs=async()=>{
        try{
           
            const res=await axios.get('http://localhost:5000/api/jobs/jobs')

            console.log('length of the jobs',res.data.totaljobs)
            setjobs(res.data.totaljobs)
        

        }catch(error){
           console.error(error)
        }
    }

    useEffect(()=>{
        if(darkMode){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }

    },[darkMode])
    useEffect(()=>{
       fetchData ()
    },[])

    useEffect(()=>{
        if(!data.length) return;

        const table =$(tableRef.current).DataTable({
            pageLength:5,
            destroy: true,
            orderCellsTop: true,
            responsive: true,
            dom: '<"top"f>rt<"bottom"ip><"clear">', // custom layout 
            
        })
        // Add input boxes to footer
        $(tableRef.current)
        .find("thead tr:eq(1) th")
        .each(function (index) {
        if(index === 5){
            $(this).html(`
                <select style="width:100%">
                <option value="">All</option>
                <option value="pending">pending</option>
                <option value="reviewed">reviewed</option>
                <option value="accepted">accepted</option>
                <option value="rejected">rejected</option>
                </select>`
        )
        }else{
               $(this).html(
        '<input type="text" placeholder="Search" style="width:100%" />'
      )}
        
    });
 

    // Apply column search
  table.columns().every(function (index) {
    const column = this;
    const headerCell= $(tableRef.current).find("thead tr:eq(1) th").eq(index);

    if (index === 5) {
     const select = $(`<select class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs p-1 outline-none">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>`).appendTo(headerCell.empty());
                select.on("change", function () {
                    column.search($(this).val()).draw();
                });
            } else {
                const input = $(`<input type="text" placeholder="Search..." class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs p-1 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />`)
                    .appendTo(headerCell.empty());

                input.on("keyup change clear", function () {
                    if (column.search() !== this.value) {
                        column.search(this.value).draw();
                    }
                });
            }
        });

        return () => table.destroy();
    }, [data]);

    const fetchData =async()=>{
        try {

            const token =localStorage.getItem("token")

            const res= await axios.get('http://localhost:5000/api/application/allapplication',{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            })
            setdata(res.data.Applications)
            console.log(res.data.Applications)
            
        } catch (error) {
            console.log("errors",error.message)   
        }
    }

    const getStatusStyle = (status) => {
        const base = "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ";
        switch (status?.toLowerCase()) {
            case 'accepted': return base + "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";
            case 'rejected': return base + "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400";
            case 'reviewed': return base + "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400";
            default: return base + "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";
        }
    };
    return (
        // <div className='p-6'>
        //     <h1 className='text-2xl  font-bold mb-4'> Admin Dashboard - Applications</h1>

        //     <table ref={tableRef} className='display w-full'>
        //         <thead>
        //             <tr>
        //                  <th>Name</th>
        //                  <th>Email</th>
        //                  <th>Phone</th>
        //                  <th>Job Title</th>
        //                  <th>Experience</th>
        //                  <th>Status</th>
        //                  <th>Applied On</th>
        //             </tr>

        //              <tr>
        //                   <th></th>
        //                   <th></th>
        //                   <th></th>
        //                   <th></th>
        //                   <th></th>
        //                   <th></th>
        //                   <th></th>
        //               </tr>
        //         </thead>
        //         <tbody>
        //             {data.map((app)=>(
        //                 <tr key={app._id}>
        //                     <td>{app.fullName}</td>
        //                     <td>{app.email}</td>
        //                     <td>{app.phone}</td>
        //                     <td>{app.jobId?.title || "N/A"}</td>
        //                     <td>{app.experience}</td>
        //                     <td>{app.status}</td>
        //                     <td>
        //                     {new Date(app.createdAt).toLocaleDateString()}
        //                     </td>

        //                 </tr>

        //             ))}
        //         </tbody>

        //     </table>

        // </div>
       <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 p-4 md:p-8 text-slate-900 dark:text-slate-100 font-sans">
            
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Applications</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Reviewing {data.length} total applicants.</p>
                </div>
                
                <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:ring-2 ring-indigo-500/20 transition-all active:scale-95"
                >
                    {darkMode ? <Sun size={18} className="text-yellow-400"/> : <Moon size={18} className="text-indigo-600"/>}
                    <span className="text-sm font-semibold">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard label="Total Applications" val={data.length} icon={<Users className="text-indigo-500"/>} />
                <StatCard label="Pending Review" val={data.filter(a => a.status === 'pending').length} icon={<Clock className="text-amber-500"/>} />
                <StatCard label="Open Positions" val={jobs} icon={<Briefcase className="text-emerald-500"/>} />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="p-4 overflow-x-auto">
                    <table ref={tableRef} className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                                <th className="px-4 py-4 font-semibold">Candidate</th>
                                <th className="px-4 py-4 font-semibold">Email</th>
                                <th className="px-4 py-4 font-semibold text-center">Mobile</th>
                                <th className="px-4 py-4 font-semibold">Job Title</th>
                                <th className="px-4 py-4 font-semibold text-center">Exp.</th>
                                <th className="px-4 py-4 font-semibold">Status</th>
                                <th className="px-4 py-4 font-semibold text-center">Resume</th>
                                <th className="px-4 py-4 font-semibold text-right">Date</th>
                            </tr>
                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                <th className="p-2"></th><th className="p-2"></th><th className="p-2 text-center"></th>
                                <th className="p-2"></th><th className="p-2 text-center"></th><th className="p-2"></th><th className="p-2"></th><th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {data.map((app) => (
                                <tr key={app._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-4 py-5 font-medium pl-6 md:pl-4">{app.fullName}</td>
                                    <td className="px-4 py-5 text-xs text-slate-500 dark:text-slate-400">{app.email}</td>
                                    <td className="px-4 py-5 text-center font-mono text-xs pr-6 md:pr-4">{app.phone}</td>
                                    <td className="px-4 py-5 font-medium pl-6 md:pl-4">{app.jobId?.title || "N/A"}</td>
                                    <td className="px-4 py-5 text-center text-xs font-semibold">{app.experience}y</td>
                                    <td className="px-4 py-5"><span className={getStatusStyle(app.status)}>{app.status}</span></td>
                                    <td className='px-4 py-5 text-center text-xs font-semibold'><a href={`http://localhost:5000/${app.resume}`} target="_blank" className="text-indigo-600 hover:underline" >View Resume</a></td>
                                    <td className="px-4 py-5 text-right text-xs text-slate-400">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;