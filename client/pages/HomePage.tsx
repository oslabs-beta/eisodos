import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Link as NavLink } from 'react-scroll';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const HomePage = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 flex h-24 justify-between backdrop-blur-sm">
        <div className="flex items-center space-x-3 text-lg">
          <img src="./assets/logos/eisodos.png" className="h-24 w-24" />
          <NavLink to="overview" spy={true} smooth={true} offset={50} duration={500} className="hover:underline">
            Overview
          </NavLink>
          <NavLink to="features" spy={true} smooth={true} offset={-100} duration={500} className="hover:underline">
            Features
          </NavLink>
          <NavLink to="demo" spy={true} smooth={true} offset={50} duration={500} className="hover:underline">
            Demo
          </NavLink>
          <NavLink to="get-started" spy={true} smooth={true} offset={50} duration={500} className="hover:underline">
            Get Started
          </NavLink>
          <NavLink to="team" spy={true} smooth={true} offset={50} duration={500} className="hover:underline">
            Team
          </NavLink>
          <a href="https://github.com/oslabs-beta/eisodos" target="_blank" rel="noreferrer">
            <img src="./assets/logos/github.png" className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/company/eisodos" target="_blank" rel="noreferrer">
            <img src="./assets/logos/linkedin.png" className="mt-1 h-6 w-6" />
          </a>
        </div>
        <div className="mr-10 flex items-center space-x-3">
          <Link to="/login" className="rounded bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 font-bold">
            Log In
          </Link>
          <Link to="/register" className="rounded bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-bold">
            Sign Up
          </Link>
        </div>
      </nav>

      <section id="#overview" className="text-center">
        <h1 className="pb-8 text-3xl font-bold">Introducing Eisodos</h1>
        <p>
          Eisodos is a developer-friendly tool that allows users to easily montior and visualize key Kubernetes health
          metrics and cluster metrics.
        </p>
      </section>

      <section id="features" className="justify-center">
        <h1 className="pb-8 text-center text-3xl font-bold">Features</h1>

        <div className="flex flex-row justify-center gap-4">
          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Pod Metrics</h3>
              <img className="h-16 w-16" src="./assets/icons/container.png" />
              <p className=" px-3 pt-3 text-center text-gray-400">
                View container-related metrics on a dashboard, presented with visualizations for easy interpretation.
              </p>
            </div>
          </div>

          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Cluster Metrics</h3>
              <img className="h-16 w-16" src="./assets/icons/chart.png" />
              <p className=" px-3 pt-3 text-center text-gray-400">
                Monitor cluster-wide metrics with user-friendly graphs providing clear insights into the cluster&apos;s
                performance.
              </p>
            </div>
          </div>

          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Secure Authentication</h3>
              <img className="h-16 w-16" src="./assets/icons/shield.png" />
              <p className="px-3 pt-3 text-center text-gray-400">
                Uphold trust in Eisodos by utilizing robust encryption and hashing techniques to ensure secure
                authentication.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-row justify-center gap-4">
          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Node Hierarchy</h3>
              <img className="h-16 w-16" src="./assets/icons/node.png" />
              <p className=" px-3 pt-3 text-center text-gray-400">
                Gain a comprehensive understanding of your cluster&apos;s structure by visualizing the hierarchical
                relationship between nodes.
              </p>
            </div>
          </div>

          <div className="h-80 w-72 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
              <h3 className="pb-5 text-xl font-bold">Sessions</h3>
              <img className="h-16 w-16" src="./assets/icons/cookies.png" />
              <p className="mt-3 px-3 text-center text-gray-400">
                Enjoy uninterrupted access to Eisodos by leveraging its efficient session and cookie management system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="#demo" className="text-center">
        <h1 className="pb-8 text-3xl font-bold">Demo</h1>
      </section>

      <section id="get-started" className="text-center">
        <h1 className="pb-8 text-3xl font-bold">Get Started</h1>
        <p> Eisodos is easy to use!</p>
        <p>
          Follow the instructions listed under &quot;Installation&quot; on our{' '}
          <a href="https://github.com/oslabs-beta/eisodos" className="underline">
            Github
          </a>{' '}
          page to get started quickly!
        </p>
      </section>

      <section id="team" className="text-center">
        <h1 className="pb-8 text-center text-3xl font-bold">Meet the Team</h1>
        <div className="flex flex-row justify-around">
          <div>
            <img src="./assets/photos/aalayah.png" className="h-36 w-36 rounded-full object-cover" />
            <h1>Aalayah Olaes</h1>
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
            <img src="./assets/photos/james.png" className="h-36 w-36 rounded-full object-cover" />
            <h1>James Adler</h1>
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
            <img src="./assets/photos/mahir.png" className="h-36 w-36 rounded-full object-cover" />
            <h1>Mahir Mohtasin</h1>
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
            <img src="./assets/photos/pearl.png" className="h-36 w-36 rounded-full object-cover" />
            <h1>Pearl Chang</h1>
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
            <img src="./assets/photos/ron.png" className="h-36 w-36 rounded-full object-cover" />
            <h1>Ron Liu</h1>
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

      <footer className="py-4 text-center"> &#169; Eisodos 2023 | MIT License</footer>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default HomePage;
