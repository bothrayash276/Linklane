import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Personal = () => {
    const [user, setUser] = useState()
    const id = useParams().id
    const navigate = useNavigate()

    useEffect(()=>{
        const BACKEND = import.meta.env.VITE_BACKEND_URI
        const accessToken = localStorage.getItem('accessToken')
        console.log(accessToken)
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
            }
        }
        checkPermission()
    }, [])

  return (
    <>

    </>
  )
}

export default Personal
