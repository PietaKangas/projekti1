const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: { type: String, required: true},
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: [] }],
  likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: [] }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  }
})

/*userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.passwordHash = await bcrypt.hash(this.password, 10)
  }
  next()
})*/

module.exports = mongoose.model('User', userSchema)
