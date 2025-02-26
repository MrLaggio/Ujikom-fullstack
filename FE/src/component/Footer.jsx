import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-bgDark text-white text-center p-4 border-t border-gray-700">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center">
          <p>&copy; {new Date().getFullYear()} TuxId. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center mt-4">
          <p className="text-sm">Designed and Developed by TuxId Team (iaka azkiano)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;