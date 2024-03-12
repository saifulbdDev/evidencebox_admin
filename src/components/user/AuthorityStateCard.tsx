import React from 'react';

const AuthorityStateCard = ({ authoritystate = { title: '', description: '', type:'' } }) => {
  return (
    <div className="bg-white px-8 py-4 ">
      <h4 className="text-sm text-gray-400">Evidence Title</h4>
      <h2 className="md:text-2xl text-base  text-gray-500 font-bold">{authoritystate?.title}</h2>
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-1 text-gray-800">type</h3>
        <p className="text-sm text-gray-500 font-normal">{authoritystate?.type}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-1 text-gray-800">Note</h3>
        <p className="text-sm text-gray-500 font-normal">{authoritystate?.description}</p>
      </div>
    </div>
  );
};

export default AuthorityStateCard;
