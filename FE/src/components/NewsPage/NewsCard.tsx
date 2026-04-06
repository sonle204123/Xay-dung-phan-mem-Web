import React from 'react';

interface NewsProps {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
}

const NewsCard: React.FC<NewsProps> = ({ image, category, title, description, date }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-100">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{category}</span>
        <h3 className="text-xl font-bold text-slate-800 mt-2 mb-3 line-clamp-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center border-t border-slate-50 pt-4">
          <span className="text-slate-400 text-xs">{date}</span>
          <button className="text-blue-600 font-semibold text-sm hover:text-blue-800">Xem thêm →</button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;