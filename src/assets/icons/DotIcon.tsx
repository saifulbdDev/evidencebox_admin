import React from 'react';

const DotIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} width="22" className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
      <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
    </svg>
  );
};

export default DotIcon;
