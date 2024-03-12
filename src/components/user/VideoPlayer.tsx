'use client'; // This is a client component
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Buttons/Button';

interface VideoPlayerProps {
  url?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url = '/SampleVideo_1280x720_5mb.mp4' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay = () => {
    const video = videoRef.current;

    if (video?.paused) {
      video?.play();
      setIsPlaying(true);
    } else {
      video?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="rounded-lg relative h-40 ">
      <div className="video-docker rounded-lg absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="min-w-full min-h-full absolute object-cover"
          src={url}
          width={230}
          height={200}
          loop
        ></video>
        <Button
          className="w-12 h-12 top-[40%] right-[40%] rounded-full absolute"
          onClick={togglePlay}
        >
          {!isPlaying ? (
            <Image
              src="/play.svg"
              alt="Play"
              className=" mx-auto"
              width={14}
              height={12}
              priority
            />
          ) : (
            <Image
              src="/pause.svg"
              alt="Pause"
              className=" mx-auto"
              width={14}
              height={12}
              priority
            />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
