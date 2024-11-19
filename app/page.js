import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="relative h-[95vh] flex flex-col justify-center items-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-5xl md:text-6xl">
            <span className="block">Premium Car Management</span>
            <span className="block text-blue-400">Made Simple</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-lg mx-auto text-lg text-gray-300 sm:text-xl md:mt-6 md:max-w-3xl">
            Organize your car inventory effortlessly. Track details, upload
            images, and manage it all in one sleek interface.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row sm:justify-center gap-4">
            <Link
              href="/register"
              aria-label="Register for the car management system"
              className="px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              aria-label="Login to the car management system"
              className="px-8 py-3 border border-transparent text-base font-semibold rounded-md text-blue-500 bg-white hover:bg-gray-100 transition-all md:py-4 md:text-lg md:px-10"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
