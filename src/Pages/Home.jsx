import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import UserLinks from '../Components/Links'
import Header from '../Components/Header'
import { ThemeContext } from '../Components/ThemeContext'

const Home = () => {
    const id  = useParams().id

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const {colorCode} = useContext(ThemeContext)
    
    useEffect(() => {
        const getData = async () => {
            try {
                const BACKEND_URI = import.meta.env.VITE_BACKEND_URI
                const response = await fetch(`${BACKEND_URI}/public`, {
                    'method' : 'GET',
                    headers : {
                        'id' : id
                    }
                })

                const json = await response.json().catch(e => console.log(e.message))
                setUser(json)
            }
            finally {
                setLoading(false)
            }
        } 
        
        getData()
    }, [])

    const [copy, setCopy] = useState(false)
    const copyToClipboard = async () => {
        const FRONTEND = import.meta.env.VITE_FRONTEND_URI
        await navigator.clipboard.writeText(`${FRONTEND}/${id}`)

        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        }, 1000);
    }


    if (loading) return (<>Loading...</>)
    const color = user.page_color

    return (
    <>
    <div
    className={`min-h-screen w-full flex flex-col items-center gap-5 px-10 py-5 relative`}
    style={{ backgroundColor : `rgb(${user.page_color}, 0.2)`}}>

        <div
        className='w-full'>
            <Header />
        </div>

        {/* Copy To Clipboard overlay */}
        <div
        className={`flex bg-green-700 p-2 rounded-4xl absolute right-10 gap-3 ${copy ? "" : "hidden"}`}>
            <i className='bi bi-check-circle-fill text-white'/>
            <div className='text-white font-[JetBrains_Mono] font-bold'>Copied to Clipboard</div>
        </div>

        {/* Information Section */}
        <div
        className='flex not-sm:flex-col gap-4 w-9/10 not-sm:items-center'>
            <img src={user.img_url} alt=""
            className={`w-20 h-20 object-cover rounded-full border-4`}
            style={{ borderColor : `rgb(${user.page_color})`}}  />

            <div
            className='flex flex-col justify-center'>

                <div 
                className='text-4xl not-sm:text-2xl font-bold font-[JetBrains_Mono] not-sm:text-center'
                style={{ color : `rgb(${user.page_color})` }} >
                    {user.name}
                </div>

                <div
                className='dark:text-[rgb(255,255,255,0.4)] text-[rgb(0,0,0,0.6)]
                 font-[JetBrains_Mono] text-sm not-sm:text-center'>
                    {user.bio}
                </div>

            </div>

            <div
            className='flex-1 justify-end flex items-center'
            >
                <div className='p-2 px-4 text-white rounded-full font-bold flex gap-3 cursor-pointer'
                onClick={copyToClipboard}
                style={{ backgroundColor : `${colorCode[user.page_color]}`}}>
                    <i className='bi bi-share-fill text-white'/>
                    Share
                </div>

            </div>

        </div>

        {/* Links */}
        <div
        className='flex flex-wrap justify-center gap-10 mt-5'>

            {
            user.links.map(link => {
                return (
                    <>
                        <UserLinks
                        name={link.name}
                        address={link.address}
                        status={link.status}
                        page_color={colorCode[user.page_color]} />

                        {console.log(user.page_color)}
                    </>
                )
            })
        }
        </div>
    </div>
    </>
  )
}

export default Home
