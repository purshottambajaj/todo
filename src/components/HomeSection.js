import React from 'react';
import { useNavigate } from 'react-router-dom';
import YettoStart from '../com/YettoStart';
import InProgress from '../com/InProgress';
import Complete from '../com/Complete';
const HomeSection = () => {
  const navigate = useNavigate(); 

  const handleAddClick = () => {
    navigate('/add');
  };

  return (
    <>
      <div className='flex flex-row justify-between px-28 py-10'>
         <div><input type='text' placeholder="Search"></input></div>
         <div> <button onClick={handleAddClick}> Add new </button> </div> 
      </div>

      
      <div class='lg:flex lg:flex-row lg:justify-between lg:mx-5 lg:px-6 lg:py-3 md:flex md:flex-col md:justify-center sm:flex sm:flex-col sm:justify-center'>
    <div class='lg:w-1/3 md:w-full sm:w-full mx-auto break-all'>
        <YettoStart/>
    </div>
    <div class='lg:w-1/3 md:w-full sm:w-full mx-auto break-all'>
        <InProgress/>
    </div>
    <div class='lg:w-1/3 md:w-full sm:w-full mx-auto break-all '>
        <Complete/>
    </div>
</div>

    </>
  );
};

export default HomeSection;
