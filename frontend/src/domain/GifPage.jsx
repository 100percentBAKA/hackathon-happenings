import React, { useState } from "react";
import { Client } from "@gradio/client";

export default function GifPage() {
  const [imageUrl, setImageUrl] = useState(""); // To hold the image URL input
  const [videoUrl, setVideoUrl] = useState(""); // To hold the generated video URL
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle errors

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value); // Update image URL state on input change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageUrl) {
      setError("Please enter a valid image URL.");
      return;
    }

    setIsLoading(true);
    setError(""); // Reset error state

    try {
      // Fetch the image from the URL
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image from URL.");
      }
      const exampleImage = await response.blob();

      // Connect to the Gradio client
      const client = await Client.connect("AashishNKumar/proj11");

      // Call the API to generate the video
      const result = await client.predict("/generate_video_from_image", {
        image_path: exampleImage,
        prompt: "Hello!!",
        enhance_prompt_toggle: true,
        img2vid_analytics_toggle: true,
        negative_prompt: "Hello!!",
        frame_rate: 21,
        seed: 0,
        num_inference_steps: 1,
        guidance_scale: 1,
        height: 256,
        width: 256,
        num_frames: 1,
      });

      // Handle the response
      const videoUrl = result.data[0]; // Assuming the video URL is in the first item of data
      setVideoUrl(videoUrl);
    } catch (error) {
      setError("Error generating video. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Generate Video from Image URL</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-lg mb-2">
            Enter Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Enter a valid image URL"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Video"}
        </button>
      </form>

      {isLoading && <p className="mt-4 text-blue-500">Please wait...</p>}

      {videoUrl && (
        <div className="mt-6 flex items-center space-x-8">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold">Generated Video</h2>
            <video
              src={videoUrl}
              controls
              className="mt-2 w-64 h-64"
            />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold">Uploaded Image</h2>
            <img
              src={imageUrl}
              alt="Uploaded Image"
              className="mt-2 w-64 h-64 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
