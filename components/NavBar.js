'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token is present in cookies (this handles page reloads)
    const checkToken = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      setIsLoggedIn(!!token);
    };

    checkToken();

    // Event listener for storage updates across tabs to keep login state synced
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const handleLogout = async () => {
    // Remove the token from cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    
    // Update login state
    setIsLoggedIn(false);

    // Dispatch event to trigger other tabs to refresh state
    window.dispatchEvent(new Event('storage'));

    // Redirect to login page
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Car Management
      </Link>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/add-car" className="hover:text-gray-300">
              Add Car
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link href="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
