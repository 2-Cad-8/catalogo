import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

export default function Filter({ filter, onSelectFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { label: "Todo", value: "todo", param: "" },
    { label: "Carteras y Bolsos", value: "Carteras y Bolsos", param: "Carteras y Bolsos" },
    { label: "Monederos", value: "Monederos", param: "Monederos" },
    { label: "Billeteras", value: "Billeteras", param: "Billeteras" },
    { label: "Lentes de Sol", value: "Lentes de Sol", param: "Lentes de Sol" },
    { label: "Accesorios para Caballeros", value: "Accesorios para Caballeros", param: "Accesorios para Caballeros" },
    { label: "Papeleria", value: "Papeleria", param: "Papeleria" },
    { label: "Accesorios para Termos", value: "Accesorios para Termos", param: "Accesorios para Termos" },
    { label: "Haircare", value: "Haircare", param: "Haircare" },
    { label: "Accesorios para Dama", value: "Accesorios para Dama", param: "Accesorios para Dama" },
    { label: "Accesorios de Pareja", value: "Accesorios de Pareja", param: "Accesorios de Pareja" },
    { label: "Tecnología", value: "Tecnología", param: "Tecnología" }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentCategoryObj = categories.find(
    c => c.value.toLowerCase() === (filter || 'todo').toLowerCase()
  ) || categories[0];

  return (
    <div className="p-4 max-w-sm w-full relative select-none" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl bg-white dark:bg-white border border-slate-300 dark:border-slate-200 px-4 py-3 text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate font-medium text-sm sm:text-base">
          {currentCategoryObj.label}
        </span>
        <svg
          className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-4 right-4 mt-2 bg-white dark:bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto py-2 divide-y divide-slate-100">
          {categories.map((cat) => {
            const isSelected = currentCategoryObj.value.toLowerCase() === cat.value.toLowerCase();
            const targetPath = cat.param === "todo" ? "/" : `/${cat.value}`;

            return (
              <Link
                key={cat.value}
                to={targetPath}
                onClick={() => {
                  setIsOpen(false);
                  if (onSelectFilter) {
                    onSelectFilter(cat.value);
                  }
                }}
                className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  isSelected 
                    ? 'bg-slate-100 text-slate-900 font-bold' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-normal'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}