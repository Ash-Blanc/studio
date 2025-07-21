'use server';
/**
 * @fileOverview Generates a video from a text prompt by first creating an image and then animating it.
 *
 * - generateVideo - A function that handles the video generation process.
 * - GenerateVideoInput - The input type for the generateVideo function.
 * - GenerateVideoOutput - The return type for the generateVideo function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
import { generateImage } from './generate-image-flow';

const GenerateVideoInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the video from.'),
  durationSeconds: z.number().default(5).describe('The duration of the video in seconds.'),
});
export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;

const GenerateVideoOutputSchema = z.object({
  videoUrl: z.string().describe('The data URI of the generated video.'),
});
export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

export async function generateVideo(input: GenerateVideoInput): Promise<GenerateVideoOutput> {
  return generateVideoFlow(input);
}

const generateVideoFlow = ai.defineFlow(
  {
    name: 'generateVideoFlow',
    inputSchema: GenerateVideoInputSchema,
    outputSchema: GenerateVideoOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the initial image from the prompt.
    const imageResult = await generateImage({ prompt: input.prompt });
    const imageUrl = imageResult.imageUrl;

    // Step 2: Use the generated image to create the video.
    const imageToVideoPrompt = [
        { text: 'Animate this image subtly and cinematically. ' + input.prompt },
        { media: { url: imageUrl, contentType: 'image/png' } }
    ];

    let { operation } = await ai.generate({
      model: googleAI.model('veo-3.0-generate-preview'),
      prompt: imageToVideoPrompt,
      config: {
        durationSeconds: input.durationSeconds,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes.
    while (!operation.done) {
      // Sleep for 5 seconds before checking again.
      await new Promise((resolve) => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video || !video.media?.url) {
      throw new Error('Failed to find the generated video in the operation result.');
    }

    // The URL from Veo is temporary and requires the API key for access.
    // We fetch it and convert to a data URI to make it client-safe.
    const fetch = (await import('node-fetch')).default;
    const videoDownloadResponse = await fetch(
      `${video.media.url}&key=${process.env.GEMINI_API_KEY}`
    );

    if (!videoDownloadResponse.ok || !videoDownloadResponse.body) {
      throw new Error(`Failed to download video file: ${videoDownloadResponse.statusText}`);
    }
    
    const buffer = await videoDownloadResponse.buffer();
    const videoDataUri = `data:${video.media.contentType || 'video/mp4'};base64,${buffer.toString('base64')}`;

    return {
      videoUrl: videoDataUri,
    };
  }
);
