import React, { useContext } from 'react'
import AddBtn from '../Components/AddBtn'
import { classyContext } from '../Context/ClassyContextFunc'
import EditBtn from '../Components/EditBtn'
import DeleteBtn from '../Components/DeleteBtn'
import { AuthContext } from '../Context/AuthDetailsContext'
import LoadingSpin from '../Components/Loading'
import Nothing from '../Components/NoPost'

export default function Home({posts , handleDelete, form,handleEdit,userName,Loading,nothing}) {
  const classes = useContext(classyContext)
  const auther = useContext(AuthContext)


    return (
    <div className={`overflow-x-hidden ${classes[0]}`}>
        {Loading?<div className='pt-20'><LoadingSpin/></div>:null}
      {nothing ? <Nothing/>:
      <div className={` flex flex-col pt-24 mx-72 justify-center items-center relative postPage`}>
          {posts.map((ele)=>
            <div key={ele.id} className='container mx-72 mb-5 border grid grid-cols-2 postDetails'>
            <div className='bg-cover postImage' style={{backgroundImage:`url('${ele.imageURL}')`}}></div>
            <div className='px-5 pt-5 flex flex-col'>
              <h3 className='text-3xl text-slate-600'>{ele.title}</h3>
              {auther?<h4 className='text-base text-gray-400 mb-5 pt-1'>{(!ele.name)?(userName):(ele.name)}</h4>:<h4 className='text-md mb-5'></h4>}
              <p className='pb-5'>{ele.description}</p>
                {auther?(!ele.name)?(
                  <div className='flex justify-between mb-5 w-52'>
                    <span onClick={()=>handleEdit(ele.id)}><EditBtn></EditBtn></span>
                    <span onClick={()=>handleDelete(ele.id)}><DeleteBtn></DeleteBtn></span>
                  </div>):null:null}
          </div>
          </div>
      )}
      </div>
    }
      {auther?<AddBtn></AddBtn>:null}
    </div>
  )
}
