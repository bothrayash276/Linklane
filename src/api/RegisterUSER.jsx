import bg from '../../public/bg11.webp'

function hexToRgbString(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
}


const cloudinary = async (file) => {
        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'linklane')
        const CLOUDINARY_URI = import.meta.env.VITE_CLOUDINARY_URI
        const response = await fetch(`${CLOUDINARY_URI}`, {
            'method' : 'POST',
            body: formData
        })

        const data = await response.json()

        return data.secure_url
    }


export default async function registerUser(imgFile, name, email, password, bio, pageHex, setError) {
    const url = await cloudinary(imgFile)
    // Converting hex to rgb
    const pageColor = hexToRgbString(pageHex)

    const userData = {
        'name' : name,
        'email' : email,
        'password' : password,
        'img_url' :  url,
        'bio' : bio,
        'bg' : 'https://res.cloudinary.com/dqwtmqxpi/image/upload/v1780505183/bg11_ngpopy.webp',
        'page_color' : pageColor
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/register`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(userData)
    })

    const result = await response.json()

    if(response.status === 409) {
        setError(result.message)
        setTimeout(() => {
            setError(false)
        }, 3000);
        return -1
    }
    else if (response.status === 201) {
        localStorage.setItem('accessToken', result.accessToken)
        localStorage.setItem('bg', bg)
        alert('Registered Successfully')
    }
}