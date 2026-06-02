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
        return [0, data.message]
    }

    const accessToken = data.accessToken
    const id = data.id
    localStorage.setItem('accessToken', accessToken)
    return [1, id]

}