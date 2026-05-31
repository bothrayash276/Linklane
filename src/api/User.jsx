export default async function userLogin(email, password) {
    const BACKEND_URI = import.meta.env.VITE_BACKEND_URI
    const response = await fetch(`${BACKEND_URI}/login`, {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            'email' : email,
            'password' : password
        })
    })

    const data = await response.json()

    if (response.status !== 200) {
        console.log(data.message)
        return 0
    }

    const accessToken = data.accessToken
    localStorage.setItem('accessToken', accessToken)
    return 1

}