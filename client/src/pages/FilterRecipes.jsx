import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const FilterRecipes = ({ recipes, search, setSearch, user, handleLike }) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("")

  const categories = Array.from(new Set(recipes.map(r => r.category))).filter(Boolean)

  const filtered = recipes.filter(recipe => {
    const title = recipe.title?.toLowerCase() || ""
    const category = recipe.category || ""
    const searchLower = search.toLowerCase()

    const matchesSearch = title.includes(searchLower)
    const matchesCategory = selectedCategory ? category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "Suosituimmat") {
      return (b.likes || 0) - (a.likes || 0)
    }
    if (sortOrder === "Uusimmat") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    }
    if (sortOrder === "Vanhimmat") {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
    }
    return 0
  })

  const userLiked = (recipe, user) => {
    if (!recipe.likedBy || ! user) return false;
    return recipe.likedBy.some(item => {
      if (typeof item === "string") return item === user.id
      if (typeof item === "object") return item.id=== user.id
      return false
    })
  }

  return (
      <main>
        <div className="flex flex-col justify-between items-start">
          <input
              type="text"
              placeholder="Hae reseptejä"
              className="mb-2 border p-2 rounded text-center"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
            <div className="flex flex-col w-64 gap-4">
              <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-2 rounded border"
              >
                <option value="">Kaikki</option>
                <option value="Suosituimmat">Suosituimmat</option>
                <option value="Uusimmat">Uusimmat</option>
                <option value="Vanhimmat">Vanhimmat</option>
              </select>
              <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded border mb-2"
              >
                <option value="">Suodata</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          {user?.token && (
              <Link to="/new-recipe">
                <button className="w-auto fw-semibold navbutton px-4 py-2 rounded h-12 mt-2"
                        style={{color: "#CB0E40"}}
                >
                  Lisää resepti
                </button>
              </Link>
          )}
        </div>

        <div className="mb-4"></div>

        <div className="gap-6 p-6">
          {sorted.map(recipe => (
              <div
                  key={recipe.id || recipe._id}
                    className="custom-nav p-4"
                >
                  <Link to={`/recipes/${recipe.id || recipe._id}`} className="flex flex-col items-center w-auto">
                    {recipe.image && (
                        <img
                            src={recipe.image || 'https://via.placeholder.com/150'}
                            alt={recipe.title}
                            className="resepti-kuva mt-2"
                        />
                    )}
                    <h3 className="text-lg font-semibold mt-3">{recipe.title}</h3>
                    <p className="text-sm text-black">{recipe.category}</p>
                  </Link>

                  {user?.token && (
                      <button
                          onClick={() => handleLike(recipe.id || recipe._id)}
                          disabled={userLiked(recipe, user)}
                          className={`flex-1 px-4 py-2 rounded h-12 ${
                              userLiked(recipe, user)
                                  ? "bg-gray-500 text-grey-800 cursor-default"
                                  : "navbutton"
                          }`}
                      >
                        {userLiked(recipe, user) ? "❤" : "️🤍"} {recipe.likes || 0}
                      </button>
                  )}
                </div>
            ))}
            {user?.token && (
                <Link to="/new-recipe">
                  <button className="w-auto fw-semibold navbutton px-4 py-2 rounded h-12 mt-4"
                          style={{color: "#CB0E40"}}
                  >
                    Lisää resepti
                  </button>
                </Link>
            )}
        </div>
      </main>
  )
}

export default FilterRecipes
