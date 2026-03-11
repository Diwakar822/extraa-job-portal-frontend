import React from 'react';
import TextType from '../components/TextType';

const AdminHome = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full'>
       <div className='text-center'>
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
          <p className="text-slate-400 mt-6 font-mono text-sm tracking-widest uppercase opacity-70">Authorized Personnel Only — Session Active</p>
       </div>
    </div>
    );
};

export default AdminHome;