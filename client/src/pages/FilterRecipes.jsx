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
  //console.log(recipes.map(r => r.createdAt))


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
      <main className=" space-y-8 ">
        <div className="flex justify-between items-start mb-6 gap-4">
          <div className="w-64">
            <input
                type="text"
                placeholder="Hae reseptejä"
                className="mb-2 border p-2 rounded text-center"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 rounded border w-48 mb-2"
            >
              <option value="">Kaikki</option>
              <option value="Suosituimmat">Suosituimmat</option>
              <option value="Uusimmat">Uusimmat</option>
              <option value="Vanhimmat">Vanhimmat</option>
            </select>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded border w-48 mb-2"
            >
              <option value="">Suodata</option>
              {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4"></div>

        <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {sorted.map(recipe => (
              <div
                  key={recipe.id || recipe._id}
                  className="custom-nav p-4 "
              >
                <Link to={`/recipes/${recipe.id || recipe._id}`} className="flex flex-col items-center w-auto">
                  {recipe.image && (
                      <img
                          src={recipe.image || 'https://via.placeholder.com/150'}
                          alt={recipe.title}
                          className="resepti-kuva"
                      />
                  )}
                  <h3 className="text-lg font-semibold mt-2 text-black">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 text-black">{recipe.category}</p>
                </Link>

                {/* Tykkäys ja lisää resepti vain kirjautuneelle */}
                {user && (
                    <div className="mt-4 flex gap-6 w-auto">
                      <button
                          onClick={() => handleLike(recipe.id || recipe._id)}
                          disabled={userLiked(recipe, user)}
                          className={`flex-1 px-4 py-2 rounded h-12 ${
                              userLiked(recipe, user)
                                  ? "bg-gray-500 text-grey-800 cursor-default"
                                  : "bg-blue-500 navbutton"
                          }`}
                      >
                        {userLiked(recipe, user) ? "💙" : "❤️"} {recipe.likes || 0}
                      </button>
                      <Link to="/new-recipe" className="flex-1">
                        <button className="w-auto text-black navbutton px-4 py-2 rounded h-12">
                          Lisää resepti
                        </button>
                      </Link>
                    </div>
                )}
              </div>
        ))}
        </div>
      </main>
  )
}

export default FilterRecipes
