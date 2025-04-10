import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <>
            <motion.nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-black/90 backdrop-blur-sm shadow-lg py-2' 
                        : 'bg-gradient-to-r from-black/90 to-gray-900/90 backdrop-blur-md text-white py-4'
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
                                <span className={`font-extrabold tracking-tight ${
                                    isScrolled ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500' : 'text-white'
                                }`}>
                                    CinéPass
                                </span>
                            </motion.div>
                        </Link>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                            <Link to="/films" className={`font-medium hover:text-red-400 transition-colors ${
                                isScrolled ? 'text-gray-300' : 'text-gray-100'
                            }`}>
                                Films
                            </Link>
                            <Link to="/schedule" className={`font-medium hover:text-red-400 transition-colors ${
                                isScrolled ? 'text-gray-300' : 'text-gray-100'
                            }`}>
                                Horaires
                            </Link>
                            <Link to="/pricing" className={`font-medium hover:text-red-400 transition-colors ${
                                isScrolled ? 'text-gray-300' : 'text-gray-100'
                            }`}>
                                Tarifs
                            </Link>
                            
                            {user ? (
                                <div className="flex items-center space-x-4 ml-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <Link to="/profile" className={`font-medium ${
                                            isScrolled ? 'text-gray-300' : 'text-white'
                                        } hover:text-red-400`}>
                                            {user.name}
                                        </Link>
                                    </div>
                                    <motion.button
                                        onClick={handleLogout}
                                        className={`px-4 py-2 rounded-full font-medium ${
                                            isScrolled 
                                                ? 'bg-gradient-to-r from-red-700 to-red-600 text-white' 
                                                : 'bg-red-600 text-white'
                                        } hover:shadow-lg transition-all`}
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
                                            className={`px-4 py-2 rounded-full font-medium ${
                                                isScrolled 
                                                    ? 'text-white border border-red-600 hover:bg-red-600/10' 
                                                    : 'text-white border border-red-500 hover:bg-red-500/10'
                                            } transition-all`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Connexion
                                        </motion.button>
                                    </Link>
                                    <Link to="/register">
                                        <motion.button
                                            className={`px-4 py-2 rounded-full font-medium ${
                                                isScrolled 
                                                    ? 'bg-gradient-to-r from-red-700 to-red-600 text-white' 
                                                    : 'bg-red-600 text-white'
                                            } hover:shadow-lg transition-all`}
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
                            <motion.button 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`p-2 rounded-md ${isScrolled ? 'text-red-500' : 'text-white'}`}
                                whileTap={{ scale: 0.9 }}
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
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>
            
            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        className="fixed top-16 left-0 right-0 z-40 md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className={`rounded-b-2xl mx-4 shadow-xl overflow-hidden ${
                                isScrolled 
                                    ? 'bg-black border border-gray-800' 
                                    : 'bg-gradient-to-b from-black to-gray-900'
                            }`}
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-4 space-y-2">
                                <Link 
                                    to="/films" 
                                    className={`block py-3 px-4 rounded-xl ${
                                        isScrolled 
                                            ? 'text-gray-200 hover:bg-gray-900' 
                                            : 'text-white hover:bg-white/5'
                                    } transition-colors`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="font-medium">Films</span>
                                </Link>
                                <Link 
                                    to="/schedule" 
                                    className={`block py-3 px-4 rounded-xl ${
                                        isScrolled 
                                            ? 'text-gray-200 hover:bg-gray-900' 
                                            : 'text-white hover:bg-white/5'
                                    } transition-colors`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="font-medium">Horaires</span>
                                </Link>
                                <Link 
                                    to="/pricing" 
                                    className={`block py-3 px-4 rounded-xl ${
                                        isScrolled 
                                            ? 'text-gray-200 hover:bg-gray-900' 
                                            : 'text-white hover:bg-white/5'
                                    } transition-colors`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="font-medium">Tarifs</span>
                                </Link>
                                
                                <div className="pt-3 mt-3 border-t border-gray-800">
                                    {user ? (
                                        <>
                                            <Link 
                                                to="/profile" 
                                                className={`block py-3 px-4 rounded-xl ${
                                                    isScrolled 
                                                        ? 'text-gray-200 hover:bg-gray-900' 
                                                        : 'text-white hover:bg-white/5'
                                                } transition-colors`}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-white font-semibold">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium">Mon profil</span>
                                                </div>
                                            </Link>
                                            <button 
                                                onClick={() => {
                                                    handleLogout();
                                                    setMobileMenuOpen(false);
                                                }}
                                                className={`w-full mt-3 py-3 px-4 rounded-xl text-center font-medium ${
                                                    isScrolled 
                                                        ? 'bg-gradient-to-r from-red-700 to-red-600 text-white' 
                                                        : 'bg-red-600 text-white'
                                                } transition-colors`}
                                            >
                                                Déconnexion
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col space-y-3">
                                            <Link 
                                                to="/login" 
                                                className={`block py-3 px-4 rounded-xl text-center font-medium ${
                                                    isScrolled 
                                                        ? 'border border-red-600 text-white hover:bg-red-600/10' 
                                                        : 'border border-red-500 text-white hover:bg-red-500/10'
                                                } transition-colors`}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Connexion
                                            </Link>
                                            <Link 
                                                to="/register" 
                                                className={`block py-3 px-4 rounded-xl text-center font-medium ${
                                                    isScrolled 
                                                        ? 'bg-gradient-to-r from-red-700 to-red-600 text-white' 
                                                        : 'bg-red-600 text-white'
                                                } transition-colors`}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Inscription
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}