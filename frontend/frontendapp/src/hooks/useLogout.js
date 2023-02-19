import useAuth from "./useAuth"
import { axiosPrivateInstance } from "../axios"

export default function useLogout() {
    const { setUser, setAccessToken, setCSRFToken } = useAuth()

    const logout = async () => {
        try {
            const response = await axiosPrivateInstance.post("logout")

            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            localStorage.removeItem('x-csrftoken');
            localStorage.removeItem('user');
            localStorage.removeItem('cargo');

            setAccessToken(null)
            setCSRFToken(null)
            setUser({})

        } catch (error) {
            // console.log(error)
        }
    }

    return logout
}