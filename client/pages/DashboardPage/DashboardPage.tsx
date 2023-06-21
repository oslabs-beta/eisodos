import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Health', path: 'health' },
  { name: 'Apps', path: 'apps' },
  { name: 'Nodes', path: 'nodes' }
];

// this is used to highlight the active tab and gray out inactive ones
function isActive(currentPath: string, path: string): string {
  if (currentPath === `/dashboard/${path}`) {
    return 'text-white-1';
  } else {
    return 'text-white-3 hover:text-white';
  }
}

const DashboardPage = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <nav className="flex flex-col gap-y-10 px-6 pt-16">
        {/* current cluster */}
        {/* TODO: turn this into a dropdown */}
        <Menu as="div">
          <Menu.Button className="inline-flex w-48 items-center justify-between rounded-lg bg-white/10 px-4 py-3 shadow-sm hover:bg-white/20">
            my-cluster
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-white-1" aria-hidden="true" />
          </Menu.Button>
        </Menu>
        {/* links for different tabs */}
        <ul className="mx-3.5 flex flex-col gap-y-7 text-lg">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className={isActive(location.pathname, item.path)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* active tab */}
      <div className="flex-1 bg-black-2">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
