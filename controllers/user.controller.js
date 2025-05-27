const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const config = require("../config/auth.config.js");
const User = require("../models/user.model");

exports.updateProfile = (req, res) => {
  let data = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    height: req.body.height,
    weight: req.body.weight,
  };
  User.findOne({
    _id: req.userId,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      User.findOneAndUpdate({ _id: req.userId }, data).then((user) => {
        res.status(200).send({ message: "Updated Successfully!" });
      });
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
};

const genAI = new GoogleGenerativeAI(config.geminiAPIKEY);

const recipeSchema = (type) => ({
  description: `List of 3(three) ${type} recipes`,
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      recipeName: {
        type: SchemaType.STRING,
        description: "Name of the recipe",
        nullable: false,
      },
      ingredients: {
        type: SchemaType.ARRAY,
        description: "ingredients of the recipe",
        items: {
          type: SchemaType.STRING,
          description: "Name of the ingredient",
          nullable: false,
        },
      },
      instructions: {
        type: SchemaType.ARRAY,
        description: "instructions to make the recipe",
        items: {
          type: SchemaType.STRING,
          description: "nth instruction",
          nullable: false,
        },
      },
    },
    required: ["recipeName", "ingredients", "instructions"],
  },
});

const schema = {
  type: SchemaType.OBJECT,
  properties: {
    breakfast: recipeSchema("breakfast"),
    lunch: recipeSchema("lunch"),
    dinner: recipeSchema("dinner"),
  },
  required: ["breakfast", "lunch", "dinner"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
    maxOutputTokens: 4048 * 4,
  },
});

exports.generateRecipes = async (req, res) => {
  let data = {
    cuisine: req.body.cuisine,
    diet: req.body.diet,
    ingredients: req.body.ingredients,
    more: req.body.more,
  };

  try {
    const result = await model.generateContent(
      `List three recipes each for breakfast, lunch, and dinner, following the specified schema:
  
      for someone who is on a ${data.diet} diet
      looking to eat ${data.cuisine} cuisine
      has a ${data.more} restriction
      already has these ingredients: ${data.ingredients} 

    `
    );
    res.status(200).send(JSON.parse(result.response.text()));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occured while generating recepies..." });
  }
};
