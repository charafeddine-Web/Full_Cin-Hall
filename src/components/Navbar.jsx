import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, setToken, setUser } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleLogout = () => {
        setToken(null);
        setUser(null);
    };
    
    return (
        <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white text-indigo-600 shadow-md py-3' 
                    : 'bg-transparent text-indigo-600 py-5'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/films" className="flex items-center space-x-2">
                        <motion.div 
                            className="text-2xl font-bold flex items-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-3xl mr-2">🎬</span>
                            <span className={`font-bold ${isScrolled ? 'text-indigo-600' : 'text-indigo-600'}`}>
                                CinéHall
                            </span>
                        </motion.div>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {/* <Link to="/films" className={`hover:text-indigo-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}>
                            Films
                        </Link> */}
                        {/* <Link to="/schedule" className={`hover:text-indigo-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}>
                            Horaires
                        </Link>
                        <Link to="/pricing" className={`hover:text-indigo-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}>
                            Tarifs
                        </Link> */}
                        
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <span className="text-indigo-600 font-semibold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <Link to="/profile" className={`font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-700'} hover:text-indigo-400`}>
                                        {user.name}
                                    </Link>
                                </div>
                                <motion.button
                                    onClick={handleLogout}
                                    className={`px-4 py-2 rounded-lg font-medium ${
                                        isScrolled 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'bg-white text-indigo-600'
                                    } hover:opacity-90 transition-opacity`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Déconnexion
                                </motion.button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login">
                                    <motion.button
                                        className={`px-4 py-2 rounded-lg font-medium ${
                                            isScrolled 
                                                ? 'text-indigo-600 border border-indigo-600' 
                                                : 'text-white border border-white'
                                        } hover:bg-opacity-10 hover:bg-white`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Connexion
                                    </motion.button>
                                </Link>
                                <Link to="/register">
                                    <motion.button
                                        className={`px-4 py-2 rounded-lg font-medium ${
                                            isScrolled 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'bg-white text-indigo-600'
                                        } hover:opacity-90`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Inscription
                                    </motion.button>
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                        >
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <motion.div 
                    className={`md:hidden ${isScrolled ? 'bg-white' : 'bg-indigo-900'} shadow-lg`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-4 pt-2 pb-4 space-y-3">
                        <Link 
                            to="/films" 
                            className={`block py-2 px-3 rounded-md ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-indigo-800'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Films
                        </Link>
                        {/* <Link 
                            to="/schedule" 
                            className={`block py-2 px-3 rounded-md ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-indigo-800'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Horaires
                        </Link>
                        <Link 
                            to="/pricing" 
                            className={`block py-2 px-3 rounded-md ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-indigo-800'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Tarifs
                        </Link> */}
                        
                        <div className="pt-4 border-t border-indigo-800">
                            {user ? (
                                <>
                                    <Link 
                                        to="/profile" 
                                        className={`block py-2 px-3 rounded-md ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-indigo-800'}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-indigo-600 font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            Mon profil
                                        </div>
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`w-full mt-3 py-2 px-3 rounded-md text-center font-medium ${
                                            isScrolled 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'bg-white text-indigo-600'
                                        }`}
                                    >
                                        Déconnexion
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-2">
                                    <Link 
                                        to="/login" 
                                        className={`block py-2 px-3 rounded-md text-center ${
                                            isScrolled 
                                                ? 'border border-indigo-600 text-indigo-600' 
                                                : 'border border-white text-white'
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Connexion
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        className={`block py-2 px-3 rounded-md text-center font-medium ${
                                            isScrolled 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'bg-white text-indigo-600'
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Inscription
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}