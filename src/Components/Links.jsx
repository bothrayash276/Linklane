import React from 'react'
import { Link } from 'react-router-dom'

const UserLinks = ({name, address, status, page_color}) => {
  return (
    <>
        <Link
        to={address}
        target='_blank'
        className={`${Number(status) ? "" : "hidden"} font-[JetBrains_Mono] p-2 px-4 rounded-lg flex gap-3 text-white cursor-pointer`}
        style={{ backgroundColor : `rgb(${page_color})`}}>
            <i className='bi bi-link-45deg text-white' /> {name}
        </Link>
    </>
  )
}

export default UserLinks
