import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Personal = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const id = useParams().id
    const navigate = useNavigate()

    useEffect(()=>{
        const BACKEND = import.meta.env.VITE_BACKEND_URI
        const accessToken = localStorage.getItem('accessToken')
        const checkPermission = async () => {
            const response = await fetch(`${BACKEND}/permission`, {
                'method' : 'GET',
                headers : {
                    'id' : id,
                    'accessToken' : accessToken
                }
            })

            if (response.status === 401) {
                alert('Permission Denied')
                navigate('/login')
                return
            }

            const data = await fetch(`${BACKEND}/public`, {
                method : 'GET',
                headers : {
                    'id' : id
                }
            })

            const json = await data.json()
            
            setUser(json)
            setLoading(false)


        }

        checkPermission()
    }, [])


    // Form
    const handleUpdateDetails = async () => {
        
    }


    


    if (loading) return (<>Loading...</>)

  return (
    <> 
        <div
        className='flex flex-col gap-10 min-h-screen w-full p-10 items-center'>

            <div
            className='flex flex-col gap-10 p-4 bg-slate-100 dark:bg-neutral-950 rounded-lg'>
                {/* Image */}
            <div
            className='flex gap-4 w-full h-20 items-center justify-between'>
                <img src={user.img_url} alt=""
                className='w-20 h-20 object-cover rounded-full border-4'
                style={{ borderColor : `rgb(${user.page_color})`}} />

                <div
                style={{ backgroundColor : `rgb(${user.page_color})`}}
                className='font-[JetBrains_Mono] flex gap-3 text-white p-2 px-4 rounded-full relative cursor-pointer'>
                    <i className='"bi bi-cloud-arrow-up-fill'/>
                    <span className='sm:hidden'>Upload</span>
                    <span className='not-sm:hidden'>Upload Image</span>
                    <input type="file" accept='images/*'
                    className='text-[rgb(0,0,0,0)] absolute left-0 top-0 h-10 w-[175.2px]'/>
                </div>
            </div>

             {/* Form */}

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
                placeholder='Name'
                defaultValue={user.name}
                className='border border-zinc-700 rounded-r-lg p-2 px-4 sm:min-w-120
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
                    placeholder='Tell us something about yourself...'
                    defaultValue={user.bio}
                    className='border border-zinc-700 rounded-r-lg p-2 px-4 sm:min-w-120
                    dark:placeholder:text-gray-400 placeholder:text-gray-500
                     dark:text-white text-black outline-none min-h-50 resize-none min-w-[214.4px]' />
                </div>

                {/* Accent Color */}
                <div
                className='w-full flex align-middle justify-center'>
                    <i
                    className='bi bi-eyedropper 
                      border-zinc-700 text-gray-500
                        border-t border-b rounded-l-lg border-l 
                        dark:text-gray-400 p-2 px-4'/>
                    <input 
                    id='color'
                    type="color"
                    defaultValue={`rgb(${user.page_color})`}
                    className='rounded-r-lg h-[41.6px] p-2 px-4 
                    border not-sm:flex-1
                    sm:min-w-120 border-zinc-700' />
                </div>
            </div>

            {/* Save Details Button */}

            <div
            onClick={handleUpdateDetails}
            className='flex gap-3 text-white p-2 px-4 rounded-full'
            style={{ backgroundColor : `rgb(${user.page_color})`}}>
                <i className='bi bi-pencil-fill'/>
                Update Details
            </div>
             
                



        </div>
    </>
  )
}

export default Personal
