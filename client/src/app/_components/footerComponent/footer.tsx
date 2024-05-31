import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-center py-4">
      <div className="flex flex-wrap justify-center gap-4">
        <p className="text-sm text-gray-500">© {currentYear} 21Cineplex</p>
        <a href="/terms-of-use" className="text-sm underline text-gray-500 hover:text-blue-500">Terms of Use</a>
        <a href="/jobs" className="text-sm underline text-gray-500 hover:text-blue-500">Jobs</a>
        <a href="/opportunities" className="text-sm underline text-gray-500 hover:text-blue-500">Opportunities</a>
        <a href="/credit-info" className="text-sm underline text-gray-500 hover:text-blue-500">Credit Info</a>
        <a href="/ixian-sitemap" className="text-sm underline text-gray-500 hover:text-blue-500">Ixian Sitemap</a>
      </div>
    </footer>
  );
};

export default Footer;
