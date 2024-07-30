import { useEffect, useState } from 'react'
import NavBar from './Components/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AddPost from './Pages/AddPost';
import EditPost from './Pages/EditPost';
import ClassyContextFunc from './Context/ClassyContextFunc';
import NotFound from './Pages/NotFound';
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "./firebase/firebase"
import AuthDetailsContext from './Context/AuthDetailsContext';
import * as Yup from 'yup';
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import {database} from './firebase/firebase';
import {v4 as uuid} from "uuid";


function App() {
  const [posts,setPosts] = useState([]);
  const [form,setForm] = useState({firstname:"",lastname:"",userEmail:"",userPass:"",confirmation:""})
  const [errors,setErrors] = useState({firstname:null,lastname:null,userEmail:null,userPass:null,confirmation:null})
  const [editPost,setEditPost] = useState({title:"",description:"",imageURL:"",editId:""})
  const [userName,setUserName] = useState("");
  const [Loading,setLoading] = useState(false);
  const [nothing,setNothing] = useState(false)
  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")
  const navigate = useNavigate();
 
  
    //fetch posts
    useEffect(()=>{
      setLoading(true);
      setTimeout(()=>{

        const fetchdata = async()=>{
      try{
        const querySnapshot = await getDocs(collection(database, 'posts'));
        const dataList = querySnapshot.docs.map((doc) => doc.data());
         setPosts(dataList);
        }catch(err){
          err.message="There was an error fetching data, please try again later";
          console.log(err.message);
        }
      }
      fetchdata()
      setLoading(false)
      
    },2000)

  }
  ,[])

  setTimeout(() => {posts.length==0?setNothing(true):setNothing(false)});

///////////////////////////////////////////////////
 
  //Edit Post
  const handleEdit = (postId)=>{
    const myPost = posts.filter((e)=>e.id == postId) 
    setEditPost({title:myPost[0].title,description:myPost[0].description,imageURL:myPost[0].imageURL,editId:myPost[0].id})
    navigate("/editpost");
  }

  const editImage = (e)=>{
    setEditPost({...editPost,imageURL:e})
  }
  const editTitle = (e)=>{
    setEditPost({...editPost,title:e})
  }
  const editDescription = (e)=>{
    setEditPost({...editPost,description:e})
  }
  const handleSave = async(e)=>{
    e.preventDefault();
    try {
      const docRef = doc(database, 'posts', editPost.editId);
      await setDoc(docRef, {
        id : editPost.editId,
        title: editPost.title,
        description: editPost.description,
        imageURL: editPost.imageURL
      })
      const querySnapshot = await getDocs(collection(database, 'posts'));
      const dataList = querySnapshot.docs.map((doc) => doc.data());
      const newList = dataList.filter((e)=>e.id == editPost.editId)
      setPosts([newList[0],...dataList.filter((e)=>e.id != editPost.editId)])
      navigate("/");
      toast.success("Post edited successfully!");

    } catch (e) {
      console.error('Error editing document: ', e);
      toast.error("Cannot edit this post right now!");
    }
  }

//////////////////////////////////////////////////

  //Delete Post
  const handleDelete = async(id)=>{
    try {
      const docRef = doc(database, 'posts', id);
      await deleteDoc(docRef);
      setPosts(posts.filter((e)=>e.id !== id))
      toast.success("Post deleted successfully!");

    } catch (e) {
      console.error('Error deleting document: ', e);
      toast.error("Cannot delete this post right now!");
    }
  }

/////////////////////////////////////////////////

//Yup validation
const schema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required!").min(3,"Min. 3 characters!"),
  lastname: Yup.string().required("Lastname is required!").min(3,"Min. 3 characters!"),
  userEmail: Yup.string().email("invalid Email, hint:'name@example.com'").required("invalid Email, hint:'name@example.com'"),
  userPass: Yup.string().required("Password is required!").min(6,"Password must be 6 characters or more").max(25).matches(/[A-Z]/, "Password must be 6 characters or more & contains at least one uppercase character"),
  confirmation: Yup.string().oneOf([Yup.ref("userPass")], "Confirmation Must match your password!")
});

////////////////////////////////////////////////////////////

  //Register
    const handleFirstname = (ele)=>{
        setForm({...form,firstname:ele})
    }
    const handleLastname = (ele)=>{
        setForm({...form,lastname:ele})
    }
    const handleEmail = (ele)=>{
        setForm({...form,userEmail:ele})
    }
    const handlePass = (ele)=>{
        setForm({...form,userPass:ele})
    }
    const handleConfirmation = (ele)=>{
        setForm({...form,confirmation:ele})
    }

  const handleChange = async (e)=>{
    e.preventDefault()
    try{
    await schema.validate(form, {abortEarly:false});   
      createUserWithEmailAndPassword(auth, form.userEmail , form.userPass)
      .then(async()=>{
        toast.success("Account created successfully!");
        const docRef = doc(database, 'users',uuid());
        await setDoc(docRef, {
          email : form.userEmail,
          Name: form.firstname + " " + form.lastname,
        })
        const querySnapshot = await getDocs(collection(database, 'users'));
        const dataList = querySnapshot.docs.map((doc) => doc.data());
        const newList = dataList.filter((e)=>e.email == form.userEmail)
        setUserName(newList[0].Name);
        navigate("/")
      }).catch((error)=>{
        console.log(error);
        toast.error("Email was already used!")
      })
  }catch(err){
    console.log(err);

    console.log(err.inner["0"]["errors"]);
    const newErr = {};
    err.inner.forEach((err)=>{
      newErr[err.path] = err.message
    });
    console.log(newErr);
    setErrors(newErr);
    console.log(errors);
  }

    }
////////////////////////////////////////////////////////////

//Login

const handleLoginEmail = (e)=>{
setEmail(e)
}
const handleLoginPass = (e)=>{
setPass(e)
}

const handleLogin = (e)=>{
  e.preventDefault()
  signInWithEmailAndPassword(auth, email , pass)
  .then(async()=>{
    toast.success("Logged in successfully!");
    const querySnapshot = await getDocs(collection(database, 'users'));
    const dataList = querySnapshot.docs.map((doc) => doc.data());
    const newList = dataList.filter((e)=>e.email == email)
    setUserName(newList[0].Name);
    navigate("/")
  }).catch((error)=>{
    toast.error("Wrong Email or password!");
    console.log(error);
  })
}
console.log(userName);
////////////////////////////////////////////////////////////


  return (
    <div>
      <ClassyContextFunc>
      <AuthDetailsContext>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home posts={posts} key={posts.id} handleDelete={handleDelete} form={form} handleEdit={handleEdit} userName={userName} Loading={Loading} nothing={nothing} />}></Route>
        <Route path='/login' element={<Login email={email} pass={pass} handleLogin={handleLogin} handleLoginEmail={handleLoginEmail} handleLoginPass={handleLoginPass} />}></Route>
        <Route path='/register' element={<Register form={form} errors={errors} handleFirstname={handleFirstname} handleLastname={handleLastname} handleConfirmation={handleConfirmation} handleEmail={handleEmail} handlePass={handlePass} handleChange={handleChange} />}></Route>
        <Route path='/addPost' element={<AddPost posts={posts} key={posts.id}/>}></Route>
        <Route path='/editPost' element={<EditPost posts={posts} key={posts.id} handleEdit={handleEdit} editPost={editPost} editImage={editImage} editDescription={editDescription} editTitle={editTitle} handleSave={handleSave}/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      </AuthDetailsContext>
      </ClassyContextFunc>
    </div>
  )
}

export default App
