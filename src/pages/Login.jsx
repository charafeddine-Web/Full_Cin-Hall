import { useState, useContext } from 'react';
import { login } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { token } = await login({ email, password });
            setToken(token);
            navigate('/films');
        } catch (err) {
            alert('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-red-700 px-6 py-8">
                        <h1 className="text-white text-3xl font-bold text-center">CinéPass</h1>
                        <p className="text-red-200 text-center mt-2">Sign in to book your favorite movies</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-red-600 hover:text-red-500">
                                    Forgot Password?
                                </a>
                            </div>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex justify-center items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </div>
                    </form>
                    
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                            Don't have an account?{" "}
                            <a href="/register" className="font-medium text-red-600 hover:text-red-500">
                                Sign up now
                            </a>
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center justify-center mt-6">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Coming soon on</span>
                        <span className="bg-black text-white text-xs px-2 py-1 rounded">iOS</span>
                        <span className="bg-black text-white text-xs px-2 py-1 rounded">Android</span>
                    </div>
                </div>
            </div>
        </div>
    );
}