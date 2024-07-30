import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { classyContext } from '../Context/ClassyContextFunc';
import Icon from 'react-icons-kit';



export default function Register({form,errors,handleChange,handleConfirmation,handleEmail,handleFirstname,handleLastname,handlePass}) {
    const [type , setType] = useState("password")
    const [icon,setIcon] = useState(eyeOff)
    const classes = useContext(classyContext)
    

    const handleShow = ()=>{
        if(type === "password"){
            setType("text")
            setIcon(eye);
        }else{
            setType("password")
            setIcon(eyeOff)
        }
    }

   
  return (
    <div>
      <section className={`bg-gray-50 dark:bg-gray-900 pt-32 pb-20 ${classes[0]}`}>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form onSubmit={handleChange} className="space-y-4 md:space-y-5" action="#" method='post'>
                <div className='flex justify-between'>
                  <div>
                      <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Firstname</label>
                      <input value={form.firstname} onChange={(e)=>handleFirstname(e.target.value)} type="text" name="firstname" id="firstname" className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name"/>
                      {errors.firstname && <div className=' max-w-48 '><span className='bg-red-400 rounded-md text-red-800 p-1 pl-2'>{errors.firstname}</span></div>}
                  </div>
                  <div>
                      <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                      <input value={form.lastname} onChange={(e)=>handleLastname(e.target.value)} type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" placeholder="Last Name"/>
                      {errors.lastname && <div className=' max-w-48'><span className='bg-red-400 rounded-md text-red-800 p-1 pl-2'>{errors.lastname}</span></div>}
                  </div>
                </div>
                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input value={form.userEmail} onChange={(e)=>handleEmail(e.target.value)} type="email" id="email" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" />
                    {errors.userEmail && <span className='bg-red-400 rounded-md text-red-800 p-1 pl-2'>{errors.userEmail}</span>}
                  </div>
                  <div>
                    <div className='relative mb-3'>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input value={form.userPass} onChange={(e)=>handlePass(e.target.value)} type={type} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      <Icon onClick={handleShow} className={`absolute bottom-3 right-4 cursor-pointer ${classes[8]}`} icon={icon}></Icon>
                    </div>
                    {errors.userPass && <span className='bg-red-400 rounded-md text-red-800 p-1 pl-2 flex text-center'>{errors.userPass}</span>}
                  </div>
                  <div className='relative'>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input value={form.confirmation} onChange={(e)=>handleConfirmation(e.target.value)} type={type} name="confirm-password" id="confirm-password" placeholder="••••••••" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      {errors.confirmation && <div><span className=' bg-red-400 rounded-md text-red-800 p-1 pl-2'>{errors.confirmation}</span></div>}
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to={"/login"} className="font-medium text-blue-800 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}
