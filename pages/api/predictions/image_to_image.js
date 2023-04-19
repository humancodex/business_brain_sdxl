import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
    "stability-ai/stable-diffusion-img2img:15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d",
    {
        input: {
            prompt: "A fantasy landscape, trending on artstation"
        }
    }
);