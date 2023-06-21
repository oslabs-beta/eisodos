import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const HomePage = () => {
  return (
    <>
      <nav className="flex h-24 justify-between">
        <div className="flex items-center space-x-3 text-lg">
          <img src="./assets/logo.png" className="h-24 w-24" />
          <a href="/#overview" className="hover:underline">
            Overview
          </a>
          <a href="/#features" className="hover:underline">
            Features
          </a>
          <a href="/#get-started" className="hover:underline">
            Get Started
          </a>
          <a href="/#demo" className="hover:underline">
            Demo
          </a>
          <a href="/#team" className="hover:underline">
            Team
          </a>
        </div>
        <div className="mr-10 flex items-center space-x-3">
          <Link to="/login" className="rounded bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 font-bold">
            Login
          </Link>
          <Link to="/register" className="rounded bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-bold">
            Register
          </Link>
        </div>
      </nav>
      <div id="#overview" className="border border-white">
        <h1>Introducing Eisodos</h1>
        <p>
          Eisodos is a developer-friendly tool that allows users to easily montior and visualize key Kubernetes health
          metrics and cluster metrics.
        </p>
        <a href="#features">Explore</a>
      </div>
      <div id="features" className="border border-white">
        Features
        <div>
          <h3>Pod Metrics</h3>

          <p>View container-related metrics on a dashboard, presented with visualizations for easy interpretation.</p>
        </div>
        <div>
          <h3>Cluster Metrics</h3>

          <p>
            Monitor cluster-wide metrics with user-friendly graphs providing clear insights into the cluster's
            performance.
          </p>
        </div>
        <div>
          <h3>Secure Authentication</h3>

          <p>
            Uphold trust in Eisodos by utilizing robust encryption and hashing techniques to ensure secure
            authentication.
          </p>
        </div>
        <div>
          <h3>Node Hierarchy</h3>

          <p>
            Gain a comprehensive understanding of your cluster's structure by visualizing the hierarchical relationship
            between nodes.
          </p>
        </div>
      </div>
      <div id="get-started" className="border border-white">Get Started</div>
      <div id="demo" className="border border-white">Demo</div>
      <div id="team" className="border border-white">Team</div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default HomePage;
