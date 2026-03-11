import React from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Briefcase, Users, LogOut, ChevronRight, Zap, User } from 'lucide-react';
import { toast } from 'react-toastify';
import Dashboard from '../pages/Dashboard';
// import { data } from 'jquery';
import { useLocation } from "react-router-dom";
import TextType from '../components/TextType';


const AdminLayout = () => {

   const navigate=useNavigate()
   const location = useLocation();
  const isHomePage = location.pathname === "/admin/";

  const handlelogout=()=>{

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Admin LoggedOut Successfully')
    setTimeout(() => {
       navigate('/login')
    }, 1000);
   

  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

    const user= localStorage.getItem("user")
    const UserString= user ? JSON.parse(user) : null
    const userName=UserString?.email
    console.log(userName, 'username')


    const bgUrl = "https://extraa-public.s3.ap-south-1.amazonaws.com/deals_banner1.jpg"

    return (
      
            <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
             {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-6">

        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-[#ffff22] rounded-lg flex items-center justify-center shadow-sm">
            {/* <Zap size={20} fill="white" /> */}
            <img src="https://extraaimagesbucket.s3.ap-south-1.amazonaws.com/cropped-extraaLogo-1.png" />
          </div>
          <h2 className="text-xl font-bold tracking-tight dark:text-white">Extraa Admin</h2>
          </div>
       
       

        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/" className={navLinkClass} end>
              <LayoutDashboard size={18} />
              <span>Home</span>
            </NavLink>

          <NavLink
            to="CreatJob"
            className={navLinkClass}
          >
            <PlusCircle size={18}/>
            <span>Create Job</span>
          </NavLink>

          <NavLink
            to="jobs"
            className={navLinkClass}
          >
            <Briefcase size={18}/>
           <span>View Jobs</span>
          </NavLink>

           <NavLink
            to="dashboard"
             className={navLinkClass}
          >
            <User size={18}/>
            <span>Applications</span>
          </NavLink>
          </nav>
           </div>

<div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <button className='flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium cursor-pointer'
          onClick={handlelogout}
          ><LogOut size={18} />
          <span>Logout Account</span>
          </button>

          </div>
        
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}

          
        />

        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
            <p className="text-sm text-slate-500">Welcome back, <span className="font-bold text-slate-800 dark:text-slate-200">{userName}</span></p>
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">Admin</div>
            </div>
        </header>

        <div className='flex-1 overflow-y-auto p-8 z-10'>

          {isHomePage ?(
            <div className='flex flex-col text-center justify-center mt-48 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
              <TextType 
                text={["System Online: Extraa Admin", 
                  "Managing Future Talents", 
                  "Control. Scale. Optimize."]}
                typingSpeed={60}
                pauseDuration={2000}
                showCursor={true}
                className='text-indigo-600 dark:text-yellow-400 font-black font-sans text-4xl md:text-6xl uppercase tracking-tighter'
                cursorCharacter="_"
              />
              <p className="text-slate-400 mt-6 font-mono text-sm tracking-widest uppercase opacity-70">
                Authorized Personnel Only — Session Active
              </p>
              
            </div>
          ): (
                <Outlet />
          )}
             
        </div>
      </main>
    </div>
    );
};

export default AdminLayout;