import React, { useContext } from 'react'
import { classyContext } from '../Context/ClassyContextFunc';

export default function EditPost({editPost,editImage,editTitle,editDescription,handleSave}) {
  const classes = useContext(classyContext)

      return (
    <div className={`pb-7 flex flex-col items-center pt-24 h-screen ${classes[0]} ${classes[2]}`}>
      <p className="font-extrabold text-5xl mb-10">Edit Your Post</p>
      <form onSubmit={handleSave} className="w-96 mx-auto">

          <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            Change old image?
          </label>
          <input
            type="text"
            value={editPost.imageURL}
            onChange={(e)=>editImage(e.target.value)}
            id="base-input"
            placeholder="Post image URL..."
            className="bg-transparent border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            Change old title?
          </label>
          <input
            type="text"
            value={editPost.title}
            onChange={(e)=>editTitle(e.target.value)}
            id="base-input"
            placeholder="Post title.."
            className="bg-transparent border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
          Change old description?
        </label>
        <textarea
          id="message"
          value={editPost.description}
          onChange={(e)=>editDescription(e.target.value)}
          rows="4"
          className="block p-2.5 w-full text-sm text-white-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Post description..."
          ></textarea>
          </div>

        <button className="bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5 ml-40">
          Save post
        </button>
      </form>
    </div>
  );

}
