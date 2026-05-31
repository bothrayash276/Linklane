export default async function registerUser(imgFileURL, name, email, password, bio, pageColor) {
    const userData = {
        'name' : name,
        'email' : email,
        'password' : password,
        'img_url' :  imgFileURL,
        'bio' : bio,
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
        throw new Error(result.message)
        return -1
    }
    else if (response.status === 201) {
        localStorage.setItem('accessToken', result.accessToken)
    }
}