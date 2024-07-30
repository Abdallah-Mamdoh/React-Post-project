import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { classyContext } from '../Context/ClassyContextFunc'

export default function AddBtn() {
  const classes = useContext(classyContext)

  return (
    <Link to={"/addPost"} className='text-white'>
        <div className={`fixed bg-slate-900 rounded-full flex justify-center items-center w-10 h-10 cursor-pointer right-10 bottom-10 addBtn ${classes[6]}`}>
        <i className={`fa-solid fa-plus ${classes[8]} `}></i>
    </div>
    </Link>
  )
}
