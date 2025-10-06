import React, { useEffect, useState } from 'react'
import userService from '../services/users'
//import recipeService from '../services/recipes'
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
        <div className="profile-page">
            <h2>Profiili</h2>
            <p><b>Nimi:</b> {user.name}</p>
            <p><b>Käyttäjätunnus:</b> {user.username}</p>
            <p><b>Salasana:</b> ********</p>

            <div className="folders">
                <div className="recipe-group">
                    <h2>Lisäämäsi reseptit</h2>
                    <ul className="recipe-list">
                        {(user.recipes ?? []).length > 0 ? (
                            (user.recipes ?? []).map(r =>
                                <li key={r.id || r._id}>
                                    <Link to={`/recipes/${r.id || r._id}`} className="recipe-link">
                                        {r.title}
                                    </Link>
                                </li>
                            )
                        ) : (
                            <li>Ei reseptejä</li>
                        )}
                    </ul>
                </div>
                <div className="recipe-group">
                    <h2>Tykkäämäsi reseptit</h2>
                    <ul className="recipe-list">
                    {(user.likedRecipes ?? []).length > 0 ? (
                            (user.likedRecipes ?? []).map(r =>
                                <li key={r.id || r._id}>
                                    <Link to={`/recipes/${r.id || r._id}`} className="recipe-link">
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
                className="delete-button"
                style={{position: 'relative' }}
            >
                POISTA TILI
            </button>
        </div>
    )
}

export default Profile
