import React from 'react';
import TextType from './TextType';
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {

    const navigate= useNavigate();

    const bgUrl = "https://extraa-public.s3.ap-south-1.amazonaws.com/deals_banner1.jpg"

    return (
        <div>

          <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}

          
        />
          
            <div className='flex text-center justify-center mt-60'>
               <TextType 
               text={["Extraa Technologies", "Welcome To Our Family", "Join With Us !"]}
               typingSpeed={75}
               pauseDuration={1500}
               showCursor={true}
               className='text-yellow-500 font-extrabold font-sans text-3xl'
               cursorCharacter="|"/>
            </div>
             
   <div className=' flex justify-evenly items-center'>

        <div class="b animate-bounce mx-auto h-16 w-64 flex justify-center items-center mt-3.5">

      <div class="i h-10 w-38 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out" onClick={()=>{navigate('/register')}}>
      </div>

      <a class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center"><span class=""><svg class="w-5 h-5 right-1.5 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg></span>Register Now!</a>
    </div>

    <div class="b animate-bounce mx-auto h-16 w-64 flex justify-center items-center mt-3.5">

      <div class="i h-10 w-34 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out" onClick={()=>{navigate('/login')}}>
      </div>

      <a class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center"><span class=""><svg class="w-5 h-5 right-1.5 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg></span>Login Now!</a>
     </div>

  </div>


        </div>
    );
};

export default WelcomePage;