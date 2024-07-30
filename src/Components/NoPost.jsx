import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthDetailsContext'

export default function Nothing() {
  const auther = useContext(AuthContext);
  
  return (
    <div className='pt-20 w-screen h-screen'>
        {auther?<div className='flex justify-evenly w-screen'>
            <div className='flex flex-col justify-center pl-40 items-center'>
                <h1 className="my-2 text-gray-800 font-bold text-6xl">No Posts :(</h1>
                <p className="my-2 mb-10 text-gray-800">There are no new posts right now, what about adding your first post?</p>
                <Link to={"/addpost"} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-10 rounded-xl text-white ">Add Post</Link>
            </div>
            <img src="https://png.pngtree.com/png-vector/20220726/ourmid/pngtree-man-upset-with-no-wifi-semi-flat-color-vector-character-png-image_6081560.png" alt="img" />
        </div>:null}
    </div>
  )
}
