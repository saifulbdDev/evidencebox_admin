import React, { useState } from 'react';
import Player from './Player';

export default function Profile() {
  const [musicList] = useState([
    {
      name: 'Nice piano and ukulele',
      author: 'Royalty',

      audio: 'https://www.bensound.com/bensound-music/bensound-buddy.mp3',
      duration: '2:02'
    },
    {
      name: 'Gentle acoustic',
      author: 'Acoustic',
      img: 'https://www.bensound.com/bensound-img/sunny.jpg',
      audio: 'https://www.bensound.com//bensound-music/bensound-sunny.mp3',
      duration: '2:20'
    },
    {
      name: 'Corporate motivational',
      author: 'Corporate',
      img: 'https://www.bensound.com/bensound-img/energy.jpg',
      audio: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
      duration: '2:59'
    },
    {
      name: 'Slow cinematic',
      author: 'Royalty',
      img: 'https://www.bensound.com/bensound-img/slowmotion.jpg',
      audio: 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
      duration: '3:26'
    }
  ]);
  return (
    <div className="px-5 py-5 bg-white  rounded-2xl shadow-3xl">
      <span className="text-sm font-semibold text-gray-600 ">Audio (2)</span>

      <div className="mt-3 space-y-5">
        {musicList.map(music => (
          <Player key={music.name} music={music} />
        ))}
      </div>
    </div>
  );
}
