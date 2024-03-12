import React from 'react';

const NotifyCard = ({ notify = { title: '', description: '' } }) => {
  return (
    <div className="bg-white px-8 py-4 ">
      <h4 className="text-sm text-gray-400">Evidence Title</h4>
      <h2 className="md:text-2xl text-base  text-gray-500 font-bold">{notify?.title}</h2>
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-1 text-gray-800">Note</h3>
        <p className="text-sm text-gray-500 font-normal">{notify?.description}</p>
      </div>
    </div>
  );
};

export default NotifyCard;
