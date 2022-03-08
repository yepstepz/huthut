import mongoose from 'mongoose'

const HutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Необходимо предоставить название'],
    maxlength: [50, 'Имя не может быть длиннее 50 символов'],
  },
  owner_alias: {
    type: String,
    required: [true],
  },
  date: {
    type: Date,
    required: [true],
  },
  short_description: {
    type: String,
    required: [true, 'Предоставьте краткое описание'],
    maxlength: [200, 'Текст не может быть длиннее 200 символов'],
  },
  type: {
    type: String,
    required: [true]
  },
  main_image_url: {
    required: [true, 'Please provide an image'],
    type: String,
  },
  image_urls: {
    required: [false],
    type: Array,
  },
  object_parental_alias: {
    type: String,
    required: [false]
  },
  alias: {
    type: String,
    required: [true],
    maxlength: [30, 'Алиас не может быть длиннее 30 символов'],
  },
  last_update: {
    type: Date
  },
  available_for_rent: {
      type: Boolean
  }
})

export default mongoose.models.Hut || mongoose.model('Hut', HutSchema)