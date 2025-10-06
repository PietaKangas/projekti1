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
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    if (sortOrder === "Vanhimmat") {
      return new Date(a.createdAt) - new Date(b.createdAt)
    }
    return 0
  })

  return (
      <main className="space-y-8">
          {/* Valikot: järjestys ja suodatus */}
        <div className="flex justify-between items-start mb-6 gap-4">
          <div className="w-64">
            <input
                type="text"
                placeholder="Hae reseptejä"
                className="mb-2 border p-2 bg-green-100 rounded text-center"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        {/* Järjestys */}
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

                {/* Suodatus */}
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

          {/* Reseptilista */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sorted.map(recipe => (
                <div
                    key={recipe.id || recipe._id}
                    className="border p-4 rounded hover:shadow-lg transition flex flex-col items-center"
                >
                  <Link to={`/recipes/${recipe.id || recipe._id}`} className="flex flex-col items-center w-full">
                    {recipe.image && (
                        <img
                            src={recipe.image || 'https://via.placeholder.com/150'}
                            alt={recipe.title}
                            className="resepti-kuva"
                        />
                    )}
                    <h3 className="text-lg font-semibold">{recipe.title}</h3>
                    <p className="text-sm text-gray-600">{recipe.category}</p>
                  </Link>

                  {/* Tykkäys ja lisää resepti vain kirjautuneelle */}
                  {user && (
                      <div className="mt-4 flex gap-6 w-full">
                        <button
                            onClick={() => handleLike(recipe.id || recipe._id)}
                            disabled={recipe.likedBy?.includes(user.id)}
                            className={`flex-1 px-4 py-2 rounded h-12 ${
                                recipe.likedBy?.includes(user.id)
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 text-black hover:bg-blue-600"
                            }`}
                        >
                          ❤️ Tykkää ({recipe.likes || 0})
                        </button>
                        <Link to="/new-recipe" className="flex-1">
                          <button className="w-full bg-green-500 text-black px-4 py-2 rounded h-12">
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
