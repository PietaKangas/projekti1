import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { useNavigate, Link} from 'react-router-dom'


const Profile = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile()
                console.log("Profiilin data:", data)
                setUser(data)
            } catch (err) {
                console.error("Profiilin haku epäonnistui:", err)
                setError("Tietojen haku epäonnistui")
            }
        }
        fetchProfile()
    }, [])

    if (error) return <p>{error}</p>
    if (!user) return <p>Ladataan...</p>

    const handleDelete = async () => {
        if (window.confirm("Haluatko varmasti poistaa tilisi?")) {
            await userService.deleteAccount()
            localStorage.removeItem('loggedRecipeappUser')
            navigate('/login')
        }
    }

    return (
        <div className="recipe-profile-page bg-white justify-content-center">
            <h2 className="font-monospace mb-4 mt-4">
                Profiili
            </h2>
            <p><b>Nimi:</b> {user.name}</p>
            <p><b>Käyttäjätunnus:</b> {user.username}</p>
            <p><b>Salasana:</b> ********</p>

            <div className="folders mt-4">
                <div className="mb-2">
                    <h2 className= "font-monospace mb-4">
                        Lisäämäsi reseptit
                    </h2>
                    <ul className="recipe-list">
                    {(user.recipes ?? []).length > 0 ? (
                            (user.recipes ?? []).map(r =>
                                <li key={r.id || r._id}>
                                    <Link to={`/recipes/${r.id || r._id}`} className="recipe-list">
                                        {r.title}
                                    </Link>
                                </li>
                            )
                        ) : (
                            <li>Ei reseptejä</li>
                        )}
                    </ul>
                    <Link to="/new-recipe">
                        <button className="w-auto text-black fw-semibold navbutton px-4 py-2 rounded h-12 mb-2">
                            Lisää resepti
                        </button>
                    </Link>
                </div>
                <div className="mb-2">
                    <h2 className="font-monospace mb-4">
                        Tykkäämäsi reseptit
                    </h2>
                    <ul className="recipe-list">
                        {(user.likedRecipes ?? []).length > 0 ? (
                            (user.likedRecipes ?? []).map(r =>
                                <li key={r.id || r._id}>
                                    <Link to={`/recipes/${r.id || r._id}`} className="recipe-list">
                                        {r.title}
                                    </Link>
                                </li>
                            )
                        ) : (
                            <li>Ei tykkäyksiä</li>
                        )}
                    </ul>
                </div>
            </div>

            <button
                onClick={handleDelete}
                className="delete-button mb-4"
                style={{position: 'relative' }}
            >
                POISTA TILI
            </button>
        </div>
    )
}

export default Profile
