export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-full bg-white  rounded shadow-md">
                {children}
            </div>
        </div>
    );
}
