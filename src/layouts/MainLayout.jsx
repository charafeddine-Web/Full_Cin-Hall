import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow px-4 py-6 bg-gray-50">
                {children}
            </main>

            <Footer />
        </div>
    );
}
