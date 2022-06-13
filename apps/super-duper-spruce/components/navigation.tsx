import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="container p-6 mx-auto md:flex md:items-center">
      <div className="md:flex-1 flex items-center justify-between">
        <div>
          <Link href="/">
            <a className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
              Super Duper Spruce
            </a>
          </Link>
        </div>

        {/* <!-- Mobile menu button --> */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="toggle menu"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
      <div className="md:flex-1 flex flex-col mt-4 space-y-2 md:mt-0 md:flex-row md:justify-center md:-mx-6 md:space-y-0">
        <Link href="/">
          <a className="text-gray-700 md:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
            Home
          </a>
        </Link>
        <Link href="/properties">
          <a className="text-gray-700 md:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
            Properties
          </a>
        </Link>
        <Link href="http://portfolio.drewpayment.com">
          <a
            target="_blank"
            className="text-gray-700 md:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
          >
            {`Portfolio`}
          </a>
        </Link>
        <Link href="http://resume.drewpayment.com">
          <a
            target="_blank"
            className="text-gray-700 md:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
          >
            {`Resume`}
          </a>
        </Link>
        <Link href="https://linkedin.com/in/drewpayment">
          <a
            className="text-gray-700 md:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
            target="_blank"
          >
            LinkedIn
          </a>
        </Link>
      </div>

      <div className="md:flex-1 invisible">&nbsp;</div>
    </nav>
  );
}

export default Navigation
