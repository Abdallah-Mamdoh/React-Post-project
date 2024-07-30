import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { classyContext } from '../Context/ClassyContextFunc';
import { AuthContext } from '../Context/AuthDetailsContext';
import SignOut from './SignOut';

export default function NavBar({profilePic}) {
  const [state,setState] = useState(false)
  const classes = useContext(classyContext)
  const auther = useContext(AuthContext);  
  
console.log(profilePic);
  const handler = ()=>{
    if(state === false){
      setState(true)
      classes[1]("bg-zinc-900 text-white")
      classes[3]("text-white")
      classes[5]("bg-zinc-800")
      classes[7]("bg-white")
      classes[9]("text-black")
    }else{
      setState(false)
      classes[1]("")
      classes[3]("")
      classes[5]("")
      classes[7]("")
      classes[9]("")
    }
  }

  return (
    <div>
      <div className={`navbar bg-blue-500 text-white pl-10 pr-10 fixed z-10 ${classes[4]} `}>
      <div className="navbar-start">
      <div className="dropdown">
      </div>
      <Link to={"/"} className="btn btn-ghost text-2xl"><img className='w-10' src='/post.png'></img> Posting</Link>
      </div>
      <div className="navbar-end">
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-13 h-10 rounded-full flex justify-center">
          <div className='border-2 border-gray-800 bg-transparent rounded-full w-10 h-10 overflow-hidden relative flex justify-center'>
            {!profilePic?<i className={`fa-regular fa-user absolute text-gray-800 text-3xl top-2 h-10 ${classes[2]}`}></i>:<img src={profilePic} alt="img" />}
          </div>

        </div>
      </div>
      {auther?
      <ul
        tabIndex={0}
        className={`menu dropdown-content bg-blue-200 rounded-box z-[1] mt-3 w-52 p-2 shadow ${classes[4]}`}>
        <li>
          <NavLink to={"/"} className={`justify-between text-gray-900 font-medium ${classes[2]}`} >
            Home
          </NavLink>
        </li>
        <li><label className={`inline-flex justify-between cursor-pointer `}>
              <span className={` text-sm font-medium text-gray-900 dark:text-gray-300 ${classes[2]}`}>Light/Dark</span>
              <input onClick={handler} type="checkbox" className="sr-only peer" checked={state} readOnly />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label></li>
            <li className={`font-medium text-gray-900 ${classes[2]}`}><SignOut/> </li>
      </ul>
      :<ul
        tabIndex={0}
        className={`menu dropdown-content bg-blue-200 rounded-box z-[1] mt-3 w-52 p-2 shadow ${classes[4]}`}>
        <li><NavLink to={"/login"} className={`font-medium text-gray-900 ${classes[2]} `}>Login/Register</NavLink></li>
        </ul>
      }
    </div>
      </div>
      </div>
    </div>
  )
}
