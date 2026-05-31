import React, { useState } from 'react'


const Register = () => {

    // Function to handle image upload
    const [image, setImage] = useState(null)

    const handleImageChange = async (e) => {
        const imageObject = e.target.files[0]
        const imageFile = URL.createObjectURL(imageObject)
        setImage(imageFile)
    }

    // Form State
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [accent_color, setAccent_color] = useState("")

    const handleForm = () => {

    }


  return (
    <>
        <div
        className='min-h-screen w-full flex justify-center not-sm:dark:bg-neutral-900 not-sm:bg-slate-100'>
            <div
            className='flex flex-col gap-5 p-5 px-10 dark:bg-neutral-900 bg-slate-100 
            rounded-lg'>

                {/* Register Title */}
                <div
                className='w-full text-6xl text-center
                dark:text-[#00a6ff] text-[#006aff] font-[Jockey_One] font-bold'>
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
                        dark:text-white text-black" />
                        <label htmlFor="image"
                        className='dark:text-white text-black font-[JetBrains_Mono]' >No Image Uploaded</label>
                        </> }
                    
                    { image && <>
                        <img src={image} alt='prev'
                    className='w-20 h-20 object-cover rounded-full '/>
                    <label htmlFor="image2"
                    className='dark:text-white text-black font-[JetBrains_Mono]'>Profile Photo</label>
                     </>}

                    
                </div>


                {/* Form */}

                {/* Name */}
                <div
                className='flex'>
                    <i className='bi bi-person-fill
                        border-zinc-700 text-gray-500
                        border-t border-b rounded-l-lg border-l 
                        dark:text-gray-400 p-2 px-4' />
                    
                    <input
                    id='name' 
                    type="name"
                    onChange={handleForm}
                    placeholder='Name'
                    className='border border-zinc-700 rounded-r-lg p-2 px-4
                    dark:placeholder:text-gray-400 placeholder:text-gray-500
                     dark:text-white text-black outline-none' />
                </div>

                {/* Email */}
                <div
                className='flex'>
                    <i className='bi bi-envelope-fill
                        border-zinc-700 text-gray-500
                        border-t border-b rounded-l-lg border-l 
                        dark:text-gray-400 p-2 px-4' />
                    
                    <input
                    id='email' 
                    type="email"
                    onChange={handleForm}
                    placeholder='Email'
                    className='border border-zinc-700 rounded-r-lg p-2 px-4
                    dark:placeholder:text-gray-400 placeholder:text-gray-500
                     dark:text-white text-black outline-none' />
                </div>

                {/* Password */}
                <div
                className='flex'>
                    <i className='bi bi-key-fill
                        border-zinc-700 text-gray-500
                        border-t border-b rounded-l-lg border-l 
                        dark:text-gray-400 p-2 px-4' />
                    
                    <input
                    id='password' 
                    type="password"
                    onChange={handleForm}
                    placeholder='Password'
                    className='border border-zinc-700 rounded-r-lg p-2 px-4
                    dark:placeholder:text-gray-400 placeholder:text-gray-500
                     dark:text-white text-black outline-none' />
                </div>

                {/* Bio */}
                <div
                className='flex'>
                    <i className='bi bi-card-text
                        border-zinc-700 text-gray-500
                        border-t border-b rounded-l-lg border-l 
                        dark:text-gray-400 p-2 px-4' />
                    
                    <textarea
                    id='bio' 
                    type="bio"
                    onChange={handleForm}
                    placeholder='Bio'
                    className='border border-zinc-700 rounded-r-lg p-2 px-4
                    dark:placeholder:text-gray-400 placeholder:text-gray-500
                     dark:text-white text-black outline-none min-h-50 resize-none min-w-[214.4px]' />
                </div>

                <div
                className='text-center'>
                    Register
                </div>

            </div>
        </div>
    </>
  )
}

export default Register
