import { useState, useEffect } from "react";

/**
 * A custom hook that takes a React ref to a <video> element
 * and returns its duration and loading state.
 * @param videoRef - A React.RefObject pointing to a <video> element.
 */
export const useHostedVideos = (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  const [duration, setDuration] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleMetadataLoad = () => {
      // Use requestAnimationFrame to ensure the state update is processed smoothly.
      requestAnimationFrame(() => {
        const seconds = Math.floor(videoElement.duration);
        if (isNaN(seconds) || seconds === 0) {
          setIsLoading(false);
          return;
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedDuration = `${minutes}:${remainingSeconds
          .toString()
          .padStart(2, "0")}`;

        setDuration(formattedDuration);
        setIsLoading(false);
      });
    };

    // If metadata is already loaded (e.g., from browser cache), run immediately.
    if (videoElement.readyState >= 1) {
      handleMetadataLoad();
    }

    // Add the event listener to handle the metadata loading.
    videoElement.addEventListener("loadedmetadata", handleMetadataLoad);

    // Cleanup function to remove the event listener when the component unmounts.
    return () => {
      videoElement.removeEventListener("loadedmetadata", handleMetadataLoad);
    };
  }, [videoRef]); // Re-run the effect if the ref changes.

  return { duration, isLoading };
};
