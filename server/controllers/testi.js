app.get('/test-recipes', async (req, res) => {
  const recipes = await Recipe.find({})
  res.json(recipes)
})
