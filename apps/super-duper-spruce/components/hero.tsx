import Image from 'next/image'
import Link from 'next/link'
import Navigation from './navigation'



const Hero = () => {
  return <>
    <section className="bg-white dark:bg-gray-800">
        <Navigation></Navigation>

        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 md:h-[32rem] md:py-16 md:flex-row md:items-center">
            <div className="w-full md:w-1/2 md:pl-20">
                <div className="md:max-w-lg">
                    <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white md:text-5xl">
                        Manage some properties!
                    </h1>

                    <div className="mt-8 space-y-5">
                        <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <span className="mx-2">NextJS Frontend</span>
                        </p>

                        <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <span className="mx-2">Apollo Client</span>
                        </p>

                        <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <span className="mx-2">TypeORM, Type-GraphQL, Express API</span>
                        </p>
                    </div>
                </div>

                <div className="w-full mt-8 bg-transparent rounded-md lg:max-w-sm dark:border-gray-700">
                    <div className="flex flex-col lg:flex-row">
                      <Link href="/properties">
                        <a className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                          <span>🚀</span>
                          <span className="mx-1">Get Started</span>
                        </a>
                      </Link>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center h-96 md:w-1/2 relative">
              <div className="image-container">
                <Image alt="glasses photo (not Drew)"
                  className="image"
                  layout="fill"
                  src={'https://images.unsplash.com/photo-1653921548384-3c1e39ab64c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'}></Image>
              </div>
            </div>
        </div>
    </section>
  </>
}

export default Hero
