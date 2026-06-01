function hexToRgbString(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
}


export default async function registerUser(imgFileURL, name, email, password, bio, pageHex) {

    // Converting hex to rgb
    const pageColor = hexToRgbString(pageHex)

    const userData = {
        'name' : name,
        'email' : email,
        'password' : password,
        'img_url' :  imgFileURL,
        'bio' : bio,
        'page_color' : pageColor
    }

    console.log(`${import.meta.env.VITE_BACKEND_URI}/register`)

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/register`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(userData)
    })

    console.log(response)

    const result = await response.json()

    if(response.status === 409) {
       // throw new Error(result.message)
        return -1
    }
    else if (response.status === 201) {
        localStorage.setItem('accessToken', result.accessToken)
    }
}