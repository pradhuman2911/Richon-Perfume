import React from 'react';
import { Link } from 'react-router-dom';

const PageBreadcrumb = ({ links = [] }) => {
  return (
    <div
      className="py-[10px] bg-[#5c3653] text-[#d6ced4]/75"
      style={{ backgroundAttachment: "fixed" }}
    >
      <div className="max-w-[1480.5px] px-4 mx-auto w-full">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 text-left">
            <nav role="navigation" aria-label="breadcrumbs">
              <ol className="flex flex-wrap items-center gap-x-4 text-md list-none p-0 m-0">
                {links.map(({ path, label }, idx) => (
                  <li
                    key={idx}
                    className={`inline-block ${
                      idx !== 0 ? 'ms-[15px] ps-[15px] relative' : ''
                    }`}
                  >
                    {idx !== 0 && (
                      <span
                        className=" text-xl font-bold absolute left-0 top-1/2 transform -translate-y-1/2 text-[#d6ced4]/50"
                        aria-hidden="true"
                      >
                        /
                      </span>
                    )}
                    <Link
                      to={path}
                      aria-current={idx === links.length - 1 ? 'page' : undefined}
                      className="inline-block text-[#d6ced4]/75 hover:text-[#d6ced4] transition duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
