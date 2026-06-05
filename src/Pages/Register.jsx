import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import registerUser from '../api/RegisterUSER'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import ErrorOverlay from '../Components/ErrorOverlay'


const Register = () => {

    const navigate = useNavigate()

    // Function to handle image upload
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)

    // Function to handle image change 
    const handleImageChange = async (e) => {
        const imageObject = e.target.files[0]
        const imageFile = URL.createObjectURL(imageObject)
        setImage(imageFile)
        setFile(imageObject)
    }

    // Form State
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [empty, setEmpty] = useState(false)

    const handleForm = (e) => {
        setEmpty(false)
        if(e.target.id === 'name') setName(e.target.value)
        else if (e.target.id === 'email') setEmail(e.target.value)
        else if (e.target.id === 'password') setPassword(e.target.value)
        else if (e.target.id === 'bio') setBio(e.target.value)
    }

    const [error, setError] = useState(false)

    // Function to register handle user
    const handleRegister = async () => {
        if (!name || !email || !password || !bio || !file) {
            setEmpty(true)
            return
        }
        const result = await registerUser(file, name, email, password, bio, '#b0efbc', setError)
    }


  return (
    <>
        <div
        className='min-h-screen px-10 py-5 relative overflow-hidden'>

            {/* Loading Header */}
            <div
            className='w-full'>
                <Header />
            </div>

            <div
            className={`${error ? "" : "hidden"}`}>
                <ErrorOverlay message={error} />
            </div>

            <div
        className='w-full flex justify-center '>

            <div
            className='flex flex-col gap-5 p-5 px-10 sm:min-w-xl items-center rounded-lg'>

                {/* Register Title */}
                <div
                className='w-full text-6xl text-center
                 text-[#a7cf4a] font-[Jockey_One] font-bold'>
                    Register
                </div>

                {/* Upload */}
                <div
                className='flex flex-col items-center gap-2 justify-center relative'>


                    <input 
                        type="file"
                        accept='image/*'
                        onChange={handleImageChange}
                        className='absolute w-1/2 h-16 cursor-pointer
                        text-[rgba(0,0,0,0)]' />

                    {!image && <>
                            <i className="text-6xl
                        bi bi-person-circle
                        text-white" />
                        <label htmlFor="image"
                        className='text-[#a7cf4a] font-[JetBrains_Mono]' >No Image Uploaded</label>
                        </> }
                    
                    { image && <>
                        <img src={image} alt='prev'
                    className='w-20 h-20 object-cover rounded-full '/>
                    <label htmlFor="image2"
                    className='text-[#a7cf4a] font-[JetBrains_Mono]'>Profile Photo</label>
                     </>}

                    
                </div>


                {/* Form */}

                {/* Name */}
                <div
                className='flex'>
                    <i className='bi bi-person-fill
                        border-zinc-700 bg-neutral-950/75
                        border-t border-b rounded-l-lg border-l 
                        text-gray-400 p-2 px-4' />
                    
                    <input
                    id='name' 
                    type="name"
                    onChange={handleForm}
                    placeholder='Name'
                    className='border border-zinc-700 rounded-r-lg p-2 px-4 sm:min-w-80
                    placeholder:text-gray-400 bg-neutral-950/75
                     text-white outline-none' />
                </div>

                {/* Email */}
                <div
                className='flex'>
                    <i className='bi bi-envelope-fill
                        border-zinc-700 bg-neutral-950/75
                        border-t border-b rounded-l-lg border-l 
                        text-gray-400 p-2 px-4' />
                    
                    <input
                    id='email' 
                    type="email"
                    onChange={handleForm}
                    placeholder='Email'
                    className='border border-zinc-700 rounded-r-lg p-2 px-4 sm:min-w-80
                    placeholder:text-gray-400 bg-neutral-950/75
                     text-white  outline-none' />
                </div>

                {/* Password */}
                <div
                className='flex'>
                    <i className='bi bi-key-fill
                        border-zinc-700 bg-neutral-950/75
                        border-t border-b rounded-l-lg border-l 
                        text-gray-400 p-2 px-4' />
                    
                    <input
                    id='password' 
                    type="password"
                    onChange={handleForm}
                    placeholder='Password'
                    className='border border-zinc-700 rounded-r-lg p-2 px-4 sm:min-w-80
                    placeholder:text-gray-400 bg-neutral-950/75
                     text-white outline-none' />
                </div>

                {/* Bio */}
                <div
                className='flex'>
                    <i className='bi bi-card-text
                        border-zinc-700 bg-neutral-950/75
                        border-t border-b rounded-l-lg border-l 
                        text-gray-400 p-2 px-4' />
                    
                    <textarea
                    id='bio' 
                    type="bio"
                    onChange={handleForm}
                    placeholder='Tell us a little about yourself...'
                    className='border border-zinc-700 rounded-r-lg p-2 px-4 sm:min-w-80
                    placeholder:text-gray-400 bg-neutral-950/75
                     text-white outline-none min-h-50 resize-none min-w-[214.4px]' />
                </div>
                
                {/* Error Message */}
                <div className={`flex items-center gap-2 ${empty ? "" : "hidden"}`}>
                    <i className='bi bi-exclamation-triangle text-red-500'/>
                    <div className='text-red-500 text-sm'>Values cannot be empty</div>
                </div>

                {/* Register Button */}
                <div
                onClick={handleRegister}
                className='text-center font-[JetBrains_Mono] border-2 p-2 px-4 rounded-lg
                text-[#a7cf4a] border-[#a7cf4a]
                hover:bg-[#a7cf4a] hover:text-white
                cursor-pointer'>
                    Register
                </div>

                {/* Redirect button to Login page */}
                <Link
                    to={`/login`}
                    className='hover:underline text-[#a7cf4a]'>
                        Sign in to a account?
                </Link>

            </div>
        </div>
        </div>
    </>
  )
}

export default Register
