import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import UserLinks from '../Components/Links'
import {v4 as uid} from 'uuid'
import ColorHex, { ColorRGB } from '../Components/ColorHex'
import Header from '../Components/Header'
import ErrorOverlay from '../Components/ErrorOverlay'
import bg1 from '../../public/bg1.webp'
import bg2 from '../../public/bg2.webp'
import bg3 from '../../public/bg3.webp'
import { ThemeContext } from '../Components/ThemeContext'


const Personal = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [addLink, setAddLink] = useState(false)
    const [newLink, setNewLink] = useState("")
    const [newImage, setNewImage] = useState(null)
    const [file, setFile] = useState(null)
    const [newLinkAddress, setNewLinkAddress] = useState("")
    const [originalPage, setOriginalPage] = useState(null)
    const {theme, setTheme, page, setPage, colorCode} = useContext(ThemeContext)
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
            setNewImage(json.img_url)
            setOriginalPage(ColorRGB(json.page_color))
            setLoading(false)


        }

        checkPermission()
    }, [])
    
    useEffect(() => {
        return () => {
            if (originalPage) setPage(originalPage)
        }
    }, [originalPage])


    // Form
    const [error, setError] = useState(false)
    const [color, setColor] = useState()

    // Function to update details
    const handleUpdateDetails = async () => {

        
        localStorage.setItem('page_color', user.page_color)

        let clr, bg
        if (!color) {
            clr = user.page_color
            bg = user.bg
        }
        else {
            clr = ColorHex(color)
            if (color === '#b0efbc') bg = 'https://res.cloudinary.com/dqwtmqxpi/image/upload/v1780505183/bg11_ngpopy.webp'
            if (color === '#29cadb') bg = 'https://res.cloudinary.com/dqwtmqxpi/image/upload/v1780505184/bg22_xdqhsb.jpg'
            if (color === '#e9cff6') bg = 'https://res.cloudinary.com/dqwtmqxpi/image/upload/v1780505183/bg33_xcl1vi.jpg'
        }

        const userData = {
            'id' : id,
            'img_url' : await cloudinary(file) || user.img_url,
            'name' : document.getElementById('name').value,
            'email' : user.email,
            'password' : user.password,
            'bio' : document.getElementById('bio').value,
            'page_color' : clr,
            'bg' : bg,
            'links' : [...user.links]
        }

        const BACKEND = import.meta.env.VITE_BACKEND_URI
        const accessToken = localStorage.getItem('accessToken')
        const response = await fetch(`${BACKEND}/update`, {
            'method' : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'accesstoken' : accessToken,
            },
            body : JSON.stringify(userData)
        })

        const result = await response.json()

        if(!response.ok) {
            setError(result.message)
            setTimeout(() => {
                setError(false)
            }, 2000);
            throw new Error(result.message)
        }
        else window.location.reload()    
        

    }

    // handle Color
    const handleColor = (e) => {
        const code = e.target.id
        const value = user.page_color
        setPage(code)
        setUser({
            ...user,
            'page_color' : ColorHex(code)
        })

        setColor(code)
    }
    
    // Function to preview image
    const handleImage = async (e) => {
        const file = e.target.files[0]
        setFile(file)
        const url = URL.createObjectURL(file)
        setNewImage(url)
    }

    // Cloudinary api
    const cloudinary = async (file) => {

        if(!file) return

        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'linklane')
        const CLOUDINARY_URI = import.meta.env.VITE_CLOUDINARY_URI
        const response = await fetch(`${CLOUDINARY_URI}`, {
            'method' : 'POST',
            body: formData
        })

        const data = await response.json()

        setNewImage(data.secure_url)
        return data.secure_url
        console.log(data.secure_url)
    }

    // Handle Empty
    const [empty, setEmpty] = useState(false)

    // Toggle Link On and Off
    const handleCheckbox = (linkOb) => {
        const links = user.links.map( linkObj => {
            if(linkObj.address === linkOb.address) {
                return {
                    ...linkOb,
                    'status' : !Number(linkOb.status)
                }
            }
            return linkObj
        })

        
        const newUser = {
            ...user,
            'links' : links
        }

        setUser(newUser)
    }

    // handle New Link input change
    const handlelLinkValue = (e) => {
        if (e.target.id === 'link_name') setNewLink(e.target.value)
        else if (e.target.id === 'link_address') setNewLinkAddress(e.target.value)
    }  

    // Add new Link
    const addNewLink = () => {
        
        if (!newLink || !newLinkAddress) {
            setEmpty(true)
            setTimeout(() => {
                setEmpty(false)
            }, 1000);
            return
        }

        const newLinkObj = {
            'id' : uid(),
            'name' : newLink,
            'address' : newLinkAddress,
            'status' : true
        }

        const links = user.links
        links.push(newLinkObj)
        
        const newUseObj = {
            ...user,
            'links' : links
        }

        setUser(newUseObj)
        setNewLink("")
        setNewLinkAddress("")
        setAddLink(false)
    }


    // Delete Link
    const handleDelete = (linkOb) => {
        const links = user.links.filter( linkObj => linkObj.id !== linkOb.id)

        const newUser = {
            ...user,
            'links' : links
        }
       setUser(newUser)
    }


    if (loading) return (<>Loading...</>)

  return (
    <> 
        <div
        className='flex flex-col gap-10 relative min-h-screen w-full px-10 py-5 items-center font-[JetBrains_Mono] overflow-hidden'
        >

            {/* Loading Header file */}
            <div
            className='w-full'>
                <Header />
            </div>

            {/* Error Message Overlay */}
           <div
           className={`${error ? "" : "hidden"}`}>
            <ErrorOverlay message={error} />
           </div>


            {/* Personal Details */}
            <div
            className='flex flex-col gap-10 p-4  bg-neutral-950/75 rounded-lg'
            style={addLink ? {filter : 'blur(5px)'} : {}}>
                
                
                {/* Image */}
                <div
                className='flex gap-4 w-full h-20 items-center justify-between'>
                    <img src={newImage} alt=""
                    className='w-20 h-20 object-cover rounded-full border-4'
                    style={{ borderColor : `rgb(${user.page_color})`}} />

                    <div
                    style={{ backgroundColor : `${colorCode[user.page_color]}`}}
                    className='font-[JetBrains_Mono] flex gap-3 text-white p-2 px-4 rounded-full relative cursor-pointer'>
                        <i className='"bi bi-cloud-arrow-up-fill'/>
                        <span className='sm:hidden'>Upload</span>
                        <span className='not-sm:hidden'>Upload Image</span>
                        <input type="file" accept='image/*'
                        onChange={handleImage}
                        className='text-[rgb(0,0,0,0)] absolute left-0 top-0 h-10 w-[175.2px]'/>
                    </div>
                </div>

                {/* Form */}

                {/* Name */}
                <div
                className='flex'>
                    <i className='bi bi-person-fill
                        border-zinc-700 
                        border-t border-b rounded-l-lg border-l 
                        text-gray-400 p-2 px-4' />
                
                <input
                id='name' 
                type="name"
                placeholder='Name'
                defaultValue={user.name}
                className='border border-zinc-700 rounded-r-lg p-2 px-4 sm:min-w-120
                placeholder:text-gray-400 
                    text-white outline-none' />
                </div>

                {/* Bio */}
                <div
                className='flex'>
                    <i className='bi bi-card-text
                        border-zinc-700 
                        border-t border-b rounded-l-lg border-l 
                        text-gray-400 p-2 px-4' />
                    
                    <textarea
                    id='bio' 
                    type="bio"
                    placeholder='Tell us something about yourself...'
                    defaultValue={user.bio}
                    className='border border-zinc-700 rounded-r-lg p-2 px-4 sm:min-w-120
                    placeholder:text-gray-400  not-sm:w-full
                     text-white  outline-none min-h-50 resize-none min-w-[214.4px]' />
                </div>

                {/* Theme Color */}
                <div
                className='w-full flex align-middle justify-between'>
                    <i
                    className='bi bi-eyedropper 
                      border-zinc-700 
                        border-t border-b rounded-l-lg border-l 
                    text-gray-400 p-2 px-4 text-xl'/>

                         <div
                    className='h-[41.59] border border-zinc-700 rounded-r-lg flex-1 items-center flex overflow-hidden p-2 gap-3'>

                        
                        <img 
                        src={bg1}
                        id='#b0efbc'
                        alt="" 
                        onClick={handleColor}
                        className='flex-1 w-1/3 object-cover h-8 cursor-pointer  ' />


                        <img 
                        src={bg2} 
                        id = '#29cadb'
                        onClick={handleColor}
                        alt="" 
                        className='flex-1 w-1/3 object-cover h-8 cursor-pointer' />
                        
                        <img 
                        src={bg3} 
                        id='#e9cff6'
                        onClick={handleColor}
                        alt="" 
                        className='flex-1 1/3 object-cover h-8 cursor-pointer' />
                            
                    </div> 

                    
                </div>
            </div>


            {/* Add Link Button */}
            <div
            className='flex sm:justify-end not-sm:justify-center w-full'>
                <div
                onClick={()=>{setAddLink(true)}}
            className='p-2 px-4 text-white flex gap-3 justify-end rounded-lg cursor-pointer'
            style={addLink ? {filter : 'blur(5px)'} : {backgroundColor : `${colorCode[user.page_color]}`}}>
                <i className='bi bi-pencil-fill' />
                Add Link
            </div>
            </div>


            {/* Add Link Card */}
            <div
            className={`${addLink ? "" : "hidden"} absolute top-10 flex flex-col gap-10
            bg-neutral-900/80  p-10 rounded-lg`}>

                <div
                className='font-[Jockey_One] text-6xl text-center
                text-white'>
                    ADD LINK
                </div>
                
                {/* Link Name */}
                <div
                className='flex'>

                    <i className='bi bi-alphabet-uppercase text-xl p-2 px-4 rounded-l-lg 
                    border-t border-b border-l-3 border-zinc-700 
                    text-white ' />

                    <input 
                    id='link_name'
                    type="text"
                    onChange={handlelLinkValue}
                    placeholder='Add link'
                    className=' placeholder:text-gray-400
                    border border-r-3 rounded-r-lg border-zinc-700 text-white
                    p-2 px-4 sm:min-w-120 outline-none' />

                </div>

                {/* Link Address */}
                <div
                className='flex'>

                    <i className='bi bi-link-45deg text-xl p-2 px-4 rounded-l-lg 
                    border-t border-b border-l-3 border-zinc-700 
                    text-white ' />

                    <input 
                    id='link_address'
                    type="link"
                    onChange={handlelLinkValue}
                    placeholder='Add link'
                    className=' placeholder:text-gray-400
                    border border-r-3 rounded-r-lg border-zinc-700 text-white
                    p-2 px-4 sm:min-w-120 outline-none' />

                </div>

                {/* Add Link Button */}
                <div
                className='flex justify-center w-full items-center gap-10'>
                    <div
                onClick={addNewLink}
                className='p-2 px-4 border rounded-lg border-zinc-700 border-x-3
                text-white  cursor-pointer'>
                    Add
                    </div>

                    <div
                onClick={()=>{setAddLink(false)}}
                className='p-2 px-4 border rounded-lg border-zinc-700 border-x-3
                text-white cursor-pointer '>
                    Cancel
                    </div>

                </div>

            </div>

            {/* Displaying Links */}
            <div
            className='flex flex-col not-sm:items-center w-full gap-4'>
                {user.links.map(linkOb => {
                    return (
                        <div
                        key={linkOb.id}>
                            <div
                            key={`${linkOb} container`}
                            className='flex items-center'
                            style={addLink ? {filter : 'blur(5px)'} : {}}>
                                <div 
                                key={`${linkOb.name}`}
                                className='border-zinc-700
                                bg-neutral-950/75
                                    border-t border-b rounded-l-lg border-l-3 
                                    text-white p-2 px-4 min-w-30'>
                                        {linkOb.name}
                                 </div>
                                
                                <Link
                                key={`${linkOb.address}`} 
                                to = {linkOb.address}
                                target='_blank'
                                className='border-zinc-700 hover:underline
                                    border bg-neutral-950/75 text-blue-600 p-2 px-4 sm:flex-1 flex gap-3'>
                                        <i className='bi bi-link' />
                                        <span className='not-sm:hidden'>{linkOb.address}</span>
                                 </Link>

                                <div
                                className='w-10.5 h-10.5 flex items-center justify-center bg-neutral-950/75
                                border-r border-t border-b border-zinc-700 '>
                                    <div
                                    onClick={() => {handleDelete(linkOb)}}
                                    className={`bi bi-trash-fill cursor-pointer
                                text-white`}>

                                    </div>
                                </div> 
                                

                                <div
                                className='w-10.5 h-10.5 flex items-center justify-center bg-neutral-950/75
                                border-r-3 border-t border-b border-zinc-700 rounded-r-lg '>
                                    <div
                                    onClick={() => {handleCheckbox(linkOb)}}
                                    className={`${Number(linkOb.status) ? "bg-green-600" : "bg-red-600"}
                                    w-5 h-5 rounded-full cursor-pointer`}>

                                    </div>
                                </div> 
                                   
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Update Details Button */}
            <div
            onClick={handleUpdateDetails}
            className={`flex gap-3 text-white p-2 px-4 rounded-full cursor-pointer`}
            style={addLink ? {filter : 'blur(5px)'} : {backgroundColor : `${colorCode[user.page_color]}`}}>
                <i className='bi bi-pencil-fill'/>
                Update Details
            </div>


            {/* Empty Field Error Message */}
            <div
            className={`bg-red-600 px-4 p-2 flex gap-3 text-white rounded-full absolute right-10
            ${empty ? "" : "hidden"}`}>
                <i className='bi bi-exclamation-triangle-fill' />
                Field cannot be empty
            </div>
             

        </div>
    </>
  )
}

export default Personal
