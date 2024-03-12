/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import Button from '../ui/Buttons/Button';
import Image from 'next/image';

interface Music {
  name: string;
  audio: string;
}

const Player: React.FC<{ music: Music }> = ({ music }) => {
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [pause, setPause] = useState<boolean>(false);

  const playerRef = useRef<HTMLAudioElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const hoverPlayheadRef = useRef<HTMLDivElement>(null);

  const changeCurrentTime = (e: { clientX: number }) => {
    const duration = playerRef.current?.duration;
    const playheadWidth = timelineRef.current?.offsetWidth;
    const offsetWidht = timelineRef.current?.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht!;
    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth!;
    playheadRef.current!.style.width = `${userClickWidhtInPercent}%`;
    playerRef.current!.currentTime = (duration! * userClickWidhtInPercent) / 100;
  };

  const hoverTimeLine = (e: { clientX: number }) => {
    const duration = playerRef.current?.duration;
    const playheadWidth = timelineRef.current?.offsetWidth;
    const offsetWidht = timelineRef.current?.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht!;
    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth!;

    if (userClickWidhtInPercent <= 100) {
      hoverPlayheadRef.current!.style.width = `${userClickWidhtInPercent}%`;
    }

    const time = (duration! * userClickWidhtInPercent) / 100;

    if (time >= 0 && time <= duration!) {
      hoverPlayheadRef.current!.dataset.content = formatTime(time);
    }
  };

  const resetTimeLine = () => {
    hoverPlayheadRef.current!.style.width = '0';
  };

  const timeUpdate = () => {
    const duration = playerRef.current?.duration;
    const timelineWidth = timelineRef.current?.offsetWidth! - playheadRef.current?.offsetWidth!;
    const playPercent = 100 * (playerRef.current?.currentTime! / duration!);
    playheadRef.current!.style.width = `${playPercent}%`;
    //@ts-ignore
    const currentTime = formatTime(parseInt(playerRef.current?.currentTime!.toString()));
    setCurrentTime(currentTime);
  };

  const formatTime = (currentTime: number): string => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    //@ts-ignore
    seconds = seconds >= 10 ? seconds : `0${seconds % 60}`;

    const formattedTime = `${minutes}:${seconds}`;

    return formattedTime;
  };

  const playOrPause = () => {
    if (!pause) {
      playerRef.current!.play();
    } else {
      playerRef.current!.pause();
    }
    setPause(!pause);
  };

  useEffect(() => {
    playerRef.current?.addEventListener('timeupdate', timeUpdate, false);

    timelineRef.current?.addEventListener('click', changeCurrentTime, false);
    timelineRef.current?.addEventListener('mousemove', hoverTimeLine, false);
    timelineRef.current?.addEventListener('mouseout', resetTimeLine, false);

    return () => {
      playerRef.current?.removeEventListener('timeupdate', timeUpdate);
      timelineRef.current?.removeEventListener('click', changeCurrentTime);
      timelineRef.current?.removeEventListener('mousemove', hoverTimeLine);
      timelineRef.current?.removeEventListener('mouseout', resetTimeLine);
    };
  }, []);

  return (
    <div className="relative rounded-2xl border border-solid bg-[#F9FAFB]">
      <div className="flex items-center justify-between">
        <audio ref={playerRef}>
          <source src={music.audio} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <div className="flex items-center w-2/5">
          <button
            onClick={playOrPause}
            className="px-1 mr-2 py-2 border border-solid border-gray-400 bg-[#F9FAFB] rounded-2xl"
          >
            <Image
              src="/microphone.svg"
              alt="download"
              className=" mx-auto"
              width={38}
              height={38}
              priority
            />
          </button>
          <span className="song-name">{music.name}</span>
        </div>

        <div className="w-2/5">
          <div
            ref={timelineRef}
            id="timeline"
            className="relative flex w-64 h-2 rounded-md bg-gray-300 cursor-pointer"
          >
            <div
              ref={playheadRef}
              id="playhead"
              className="relative rounded-md z-10 w-0 h-2 bg-primary-400"
            ></div>
            <div
              ref={hoverPlayheadRef}
              className="hover-playhead absolute top-0  before:bg-primary-300 h-2 after:border-t-primary-300"
            ></div>
          </div>
        </div>

        <div className="controls flex space-x-4 items-center mr-2">
          <div className="time">
            <div className="current-time">{currentTime}</div>
          </div>
          <Button onClick={playOrPause} className="px-2.5 py-2 rounded-full">
            {!pause ? (
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
          <Button onClick={playOrPause} className="px-2.5 py-2 rounded-full">
            <Image
              src="/download.svg"
              alt="download"
              className=" mx-auto"
              width={14}
              height={12}
              priority
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Player;
