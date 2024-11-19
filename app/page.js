import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">

      {/* Hero Section */}
      <div className="relative h-[95vh] ">
        <div className="relative max-w-7xl mx-auto pt-20 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl tracking-tight font-extrabold text-gray-100 sm:text-6xl md:text-7xl">
              <span className="block">Premium Car Management</span>
              <span className="block text-blue-400">Made Simple</span>
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-lg text-gray-300 sm:text-xl md:mt-6 md:max-w-3xl">
              Organize your car inventory effortlessly. Track details, upload
              images, and manage it all in one sleek interface.
            </p>
            <div className="mt-12 max-w-lg mx-auto sm:flex sm:justify-center md:mt-16">
              <div className="rounded-md shadow">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
              <div className="mt-4 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-blue-500 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
