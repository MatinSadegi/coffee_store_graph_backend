import mongoose from "mongoose";

const coffeeSchema = new mongoose.Schema({
  countryOfOrigin: { type: String },
  blendAndSuitability: {
    arabicaPercentage: Number,
    robustaPercentage: Number,
  },
  caffeineDose: { type: String },
  suitableMachines: { type: [String] },
});

const machineSchema = new mongoose.Schema({
  color: { type: String, required: true },
  caterTankCapacity: { type: Number, required: true },
  dimensions: { H: Number, W: Number, D: Number },
  weight: { type: Number, required: true },
  power: { type: Number, required: true },
});
const cupSchema = new mongoose.Schema({
  color: { type: String, required: true },
  capacity: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  saucerWidth: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    productName: { type: String, required: true, trim: true },
    slug: { type: String, lowercase: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    brand: { type: String },
    inStock: { type: Number, required: true },
    trending: { type: Boolean, required: true },
    image: {
      url: String,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating: { type: Number, default: 0 },
    coffeeData: {
      type: coffeeSchema,
    },
    cupData: {
      type: cupSchema,
    },
    machineData: {
      type: machineSchema,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
