import bg from '../../public/bg11.webp'


// Function to convert HEX Code to RGB Code
function hexToRgbString(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
}


// Function to upload profile photo into cloudinary
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


// Functino to register a new user
export default async function registerUser(imgFile, name, email, password, bio, pageHex, setError) {
    
    // Uploading the image and getting the image url
    const url = await cloudinary(imgFile)

    // Converting hex to rgb
    const pageColor = hexToRgbString(pageHex)

    // User data object
    const userData = {
        'name' : name,
        'email' : email,
        'password' : password,
        'img_url' :  url,
        'bio' : bio,
        'bg' : 'https://res.cloudinary.com/dqwtmqxpi/image/upload/v1780505183/bg11_ngpopy.webp',
        'page_color' : pageColor
    }

    // Fetching a post request to the backend to upload data
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/register`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(userData)
    })

    // Converting the response into json file
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