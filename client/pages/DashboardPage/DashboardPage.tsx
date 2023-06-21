import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Health', to: 'health', current: true },
  { name: 'Apps', to: 'apps', current: false },
  { name: 'Nodes', to: 'nodes', current: false }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const DashboardPage = () => {
  console.log(useLocation());

  return (
    <div className="flex">
      <nav className="flex flex-col gap-y-8 px-6 pt-12">
        <Menu as="div">
          <Menu.Button className="inline-flex w-48 items-center justify-between rounded-lg bg-white/10 px-4 py-3 shadow-sm hover:bg-white/20">
            my-cluster
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-white-1" aria-hidden="true" />
          </Menu.Button>
        </Menu>
        <ul className="mx-3.5 flex flex-col gap-y-7 text-lg">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link to={item.to} className={classNames(item.current ? 'text-white' : 'text-white-3  hover:text-white')}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
