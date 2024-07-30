import React, { useContext, useState } from 'react'
import { classyContext } from '../Context/ClassyContextFunc';
import {v4 as uuid} from "uuid";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase/firebase';
import { toast } from 'react-toastify';

export default function AddPost({posts}) {
  const [addForm,setAddForm] = useState({title:"",description:"",imageURL:""})
  const [addError,setAddError] = useState({title:null,imageURL:null})
  const randomId = uuid();
  const navigate = useNavigate();
  const classes = useContext(classyContext)



  const handleTitle = (e)=>{
    setAddForm({...addForm,title:e})
  }
  const handleDesc = (e)=>{
    setAddForm({...addForm,description:e})
  }
  const handleImage = (e)=>{
    setAddForm({...addForm,imageURL:e})
  }

  const handlePost =async (e)=>{
    e.preventDefault()
    setAddError((prevErrors)=>({title:null,imageURL:null}))
    if(!addForm.title){
      setAddError((prevErrors)=>({...prevErrors,title:"Post title is required!"}))
    }if(!addForm.imageURL){
      setAddError((prevErrors)=>({...prevErrors,imageURL:"Post image URL is required!"}))
    }else if(addForm.title && addForm.imageURL){
    try {
      const docRef = doc(database, 'posts', randomId);
      await setDoc(docRef, {
        id : randomId,
        title: addForm.title,
        description: addForm.description,
        imageURL: addForm.imageURL
      })
          const querySnapshot = await getDocs(collection(database, 'posts'));
          const dataList = querySnapshot.docs.map((doc) => doc.data());
          const newList = dataList.filter((e)=>e.id == randomId)
          posts.unshift(newList[0]);
          toast.success("Post created successfully!");
          navigate("/");
    } catch (e) {
      console.error('Error adding post: ', e);
      toast.error("Cannot create this post right now!");
      
    }
  
  }}


      return (
    <div className={`pb-7 flex flex-col items-center pt-24 h-screen ${classes[0]} ${classes[2]}`}>
      <p className="font-extrabold text-5xl mb-8">Add Your Post</p>
      <form onSubmit={handlePost} className="w-96 mx-auto">

          <div className="mb-3">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            Image URL
          </label>
          <input
            type="text"
            id="base-input"
            value={addForm.imageURL}
            onChange={(e)=>handleImage(e.target.value)}
            placeholder="Post image URL..."
            className="bg-transparent border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {addError.imageURL && <div className=' max-w-60 mt-3'><span className='bg-red-400 rounded-md text-red-800 p-1 pl-2'>{addError.imageURL}</span></div>}
        </div>

        <div className="mb-3">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="base-input"
            value={addForm.title}
            onChange={(e)=>handleTitle(e.target.value)}
            placeholder="Post title.."
            className="bg-transparent border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {addError.title && <div className=' max-w-48 mt-3'><span className='bg-red-400 rounded-md text-red-800 p-1 pl-2'>{addError.title}</span></div>}

        </div>

        <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
          Description
        </label>
        <textarea
          id="message"
          value={addForm.description}
          onChange={(e)=>handleDesc(e.target.value)}
          rows="4"
          className="block p-2.5 w-full text-sm text-white-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Post description..."
          ></textarea>
          </div>

        <button className="bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5 ml-40">
          Add post
        </button>
      </form>
    </div>
  );

}
