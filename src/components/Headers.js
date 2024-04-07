import React, { useState } from 'react';
import profileImage from '../assets/Profile.jpg';


const MobileHead = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className='flex flex-row justify-between px-4 py-3'>
      <div className='flex items-center md:items-start font-bold text-xl md:text-2xl'>
          Logo
        </div>
        <div className='flex items-center mt-4 '>
          <div className="flex items-center">
            <button onClick={toggleMenu} className="md:hidden text-gray-600 focus:outline-none focus:text-gray-900">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
          {menuOpen && (
             <div className="flex flex-col">
               <div className="flex flex-row">
                     <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                    <p className="text-sm md:text-base">purshottam</p>
                </div>
              <div className="md:hidden ml-4">
              <ul className="flex flex-col">
                <li className="py-1"><a href='YettoStart.js' target='_blank'>Yet to Start</a></li>
                <li className="py-1"><a href='Completed' >Completed</a></li>
                <li className="py-1"><a href='InProgress.js' target='_blank'>In Progress</a></li>
              </ul>
            </div>
            </div>
          )}
        </div>
        
        
      </div>
    </>
  );
};



const Navlg2 =() =>{
  return(  
    <>
     <div className='row container flex mx-auto items-center w-full justify-between h-14'>
      <div className='row container flex  w-10 items-center '>
        Logo
      </div>
      <div>
         <div className="flex items-center ml-4 ">
            <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
            <p className="text-sm md:text-base">purshottam</p>
          </div>
      </div>

      
    </div>
       
  </>
  )
}

const Headers = () => {
    

  return (
    <>
    <nav className='px-4 py-2'>
    <div className="md:hidden">
    <MobileHead/>
      </div>    
    
    
  <div className="hidden lg:flex  md:flex">
          <Navlg2/>
    </div>
</nav>
</>
  );
};

export default Headers;
