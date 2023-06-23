import React from 'react';
import { Link } from 'react-router-dom';
import { Link as NavLink } from 'react-scroll';

const HomePage = () => {
  return (
    <>
      {/* navbar */}
      <nav className="fixed top-0 z-50 flex h-24 w-screen justify-between px-10 backdrop-blur-sm">
        {/* left side */}
        <div className="flex items-center space-x-3 text-lg">
          <NavLink to="features" spy={true} smooth={true} duration={500} className="hover:underline">
            Features
          </NavLink>
          <NavLink to="demo" spy={true} smooth={true} duration={500} className="hover:underline">
            Overview
          </NavLink>
          <NavLink to="get-started" spy={true} smooth={true} duration={500} className="hover:underline">
            Get Started
          </NavLink>
          <NavLink to="team" spy={true} smooth={true} duration={500} className="hover:underline">
            Team
          </NavLink>
          <a href="https://github.com/oslabs-beta/eisodos" target="_blank" rel="noreferrer">
            <img src="./assets/logos/github.png" className="h-6 w-6 pb-0.5" />
          </a>
          <a href="https://linkedin.com/company/eisodos-app" target="_blank" rel="noreferrer">
            <img src="./assets/logos/linkedin.png" className="h-6 w-6" />
          </a>
        </div>
        {/* right side */}
        <div className="flex items-center space-x-3">
          <Link to="/login" className="rounded bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-1 text-lg font-bold">
            Log In
          </Link>
          <Link
            to="/register"
            className="rounded bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 text-lg font-bold">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* overview */}
      <section id="overview" className="flex h-screen items-center justify-center">
        <div className="flex h-fit items-center gap-x-10">
          <img src="./assets/logos/eisodos.png" className="h-80 w-80" />
          <div>
            <h1 className="text-6xl font-bold">Eisodos</h1>
            <p>Monitor and visualize your key Kubernetes health metrics and cluster data</p>
          </div>
        </div>
      </section>

      {/* features */}
      <section id="features" className="mx-4 flex min-h-screen flex-col items-center justify-center">
        <h1 className="pb-8 text-center text-3xl font-bold">Features</h1>
        <div className="flex max-w-[60rem] flex-wrap justify-center gap-4">
          {/* cluster metrics */}
          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Cluster Metrics</h3>
              <img className="h-16 w-16" src="./assets/icons/chart.png" />
              <p className=" px-3 pt-3 text-center text-gray-400">
                Monitor cluster-wide metrics with user-friendly graphs providing clear insights into overall cluster
                health.
              </p>
            </div>
          </div>
          {/* pod metrics */}
          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Pod Metrics</h3>
              <img className="h-16 w-16" src="./assets/icons/container.png" />
              <p className=" px-3 pt-3 text-center text-gray-400">
                Keep updated on each pod in your cluster with easily-accessible status and metrics at the pod level.
              </p>
            </div>
          </div>
          {/* node hierarchy */}
          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Node Hierarchy</h3>
              <img className="h-16 w-16" src="./assets/icons/node.png" />
              <p className=" px-3 pt-3 text-center text-gray-400">
                Understand the overall structure of your cluster with a visual diagram of your namespaces, nodes, and
                pods.
              </p>
            </div>
          </div>
          {/* secure authentication */}
          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Secure Authentication</h3>
              <img className="h-16 w-16" src="./assets/icons/shield.png" />
              <p className="px-3 pt-3 text-center text-gray-400">
                Robust encryption and hashing techniques to ensure secure authentication.
              </p>
            </div>
          </div>
          {/* sessions */}
          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Sessions</h3>
              <img className="h-16 w-16" src="./assets/icons/cookies.png" />
              <p className="mt-3 px-3 text-center text-gray-400">
                Enjoy uninterrupted access to your dashboard with an efficient session management system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* demo */}
      <section id="demo" className="flex min-h-screen flex-col items-center justify-center pt-20 space-y-10">
        <h1 className="pt-10 pb-8 text-3xl font-bold">Overview</h1>
        
        <div className="">
          <img src="./assets/photos/Health.png" className="rounded h-2/4 w-2/4 justify-center mx-auto"/> 
          <h3 className='text-center px-10 text-2xl font-bold underline'>Dashboard</h3>
          <p className="mb-20 text-center text-lg">Once logged in, you'll see the dashboard. This is where live metrics from your Kubernetes cluster are shown in a clear and easy-to-understand format.
</p>
        </div>
        
        <div className="">
          <img src="./assets/photos/Apps.png" className="rounded h-2/4 w-2/4 justify-center mx-auto"/>
          <h3 className='text-center px-10 text-2xl font-bold underline'>Applications and Pods</h3>
        <p className="mb-20 text-center text-lg">Check out which applications and pods are running. You can see if everything is working fine or if there are any issues that need your attention.
</p>
        </div>
        <div className="">
          <img src="./assets/photos/Diagram.png" className="rounded h-2/4 w-2/4 justify-center mx-auto"/>
          <h3 className='text-center px-10 text-2xl text-bold underline'>Hierarchy Graph</h3>
        <p className="mb-20 text-center text-lg">Explore the hierarchy graph to understand the relationships within your cluster, including how namespaces, nodes, and pods connect with each other.</p>
        </div>
      </section>

      {/* get started */}
      <section id="get-started" className="flex h-screen flex-col items-center justify-center">
        <h1 className="pb-8 text-3xl font-bold">Get Started</h1>
        <p className="text-2xl"> Eisodos is easy to use!</p>
        <p className="text-2xl">
          Follow the instructions listed under &quot;Installation&quot; on our{' '}
          <a href="https://github.com/oslabs-beta/eisodos" className="underline hover:text-blue-3">
            GitHub
          </a>{' '}
          page to get started quickly!
        </p>
      </section>

      {/* team */}
      <section id="team" className="flex h-screen flex-col text-center">
        <h1 className="mb-10 pb-8 text-center text-3xl font-bold">Meet the Team</h1>
        <div className="mx-48 flex justify-evenly text-xl">
          <div>
            <img src="./assets/photos/aalayah.png" className="h-44 w-44 rounded-full object-cover" />
            <h1 className="mb-4 mt-6">Aalayah Olaes</h1>
            <div className="flex flex-row justify-evenly">
              <a href="https://github.com/AalayahOlaes" target="_blank" rel="noreferrer">
                <img src="./assets/logos/github.png" className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/aalayaholaes" target="_blank" rel="noreferrer">
                <img src="./assets/logos/linkedin.png" className="m-0.5 h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <img src="./assets/photos/james.png" className="h-44 w-44 rounded-full object-cover" />
            <h1 className="mb-4 mt-6">James Adler</h1>
            <div className="flex flex-row justify-evenly">
              <a href="https://github.com/jadler999" target="_blank" rel="noreferrer">
                <img src="./assets/logos/github.png" className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/james-adler-/" target="_blank" rel="noreferrer">
                <img src="./assets/logos/linkedin.png" className="mt-0.5 h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <img src="./assets/photos/mahir.png" className="h-44 w-44 rounded-full object-cover" />
            <h1 className="mb-4 mt-6">Mahir Mohtasin</h1>
            <div className="flex flex-row justify-evenly">
              <a href="https://github.com/viiewss" target="_blank" rel="noreferrer">
                <img src="./assets/logos/github.png" className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/mmohtasin/" target="_blank" rel="noreferrer">
                <img src="./assets/logos/linkedin.png" className="mt-0.5 h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <img src="./assets/photos/pearl.png" className="h-44 w-44 rounded-full object-cover" />
            <h1 className="mb-4 mt-6">Pearl Chang</h1>
            <div className="flex flex-row justify-evenly">
              <a href="https://github.com/pearlhchang" target="_blank" rel="noreferrer">
                <img src="./assets/logos/github.png" className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/pearlhchang/" target="_blank" rel="noreferrer">
                <img src="./assets/logos/linkedin.png" className="mt-0.5 h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <img src="./assets/photos/ron.png" className="h-44 w-44 rounded-full object-cover" />
            <h1 className="mb-4 mt-6">Ron Liu</h1>
            <div className="flex flex-row justify-evenly">
              <a href="https://github.com/ronliu" target="_blank" rel="noreferrer">
                <img src="./assets/logos/github.png" className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/ron-liu/" target="_blank" rel="noreferrer">
                <img src="./assets/logos/linkedin.png" className="mt-0.5 h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="py-4 text-center"> &#169; Eisodos 2023 | MIT License</footer>
    </>
  );
};

export default HomePage;
