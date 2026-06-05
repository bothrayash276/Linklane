// Function to login the user
export default async function userLogin(email, password) {

    // Importing BACKEND URL from the env file
    const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

    // Fetching a response to backend to get access token
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

    // Converting the response into json file
    const data = await response.json()

    if (response.status !== 200) {
        return [0, data.message]
    }

    // Extracting the excess token and id 
    const accessToken = data.accessToken
    const id = data.id

    // Storing the accessToken into local storage
    localStorage.setItem('accessToken', accessToken)
    return [1, id]

}