import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
  },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 10;
      },
      message: 'Maximum 10 images allowed',
    },
  },
  tags: {
    car_type: String,
    company: String,
    dealer: String,
  },
}, { timestamps: true });

carSchema.index({
  title: 'text',
  description: 'text',
  'tags.car_type': 'text',
  'tags.company': 'text',
  'tags.dealer': 'text',
});

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);
export default Car;
