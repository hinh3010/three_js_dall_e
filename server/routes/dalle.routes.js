import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  // organization: "org-OAxNIDcLGUm1VnDIPDQoj372",
  // apiKey: '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',
  apiKey: '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'
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    console.log({ response })

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(500).json({ message: error.message })
  }
})

export default router;