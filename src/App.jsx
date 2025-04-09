import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import FilmsList from './pages/FilmsList';
import FilmDetail from './pages/FilmDetail';
import SeatReservation from './pages/SeatReservation';
import Payment from './pages/Payment';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth pages */}
            <Route
                path="/login"
                element={
                  <AuthLayout>
                    <Login />
                  </AuthLayout>
                }
            />
            <Route
                path="/register"
                element={
                  <AuthLayout>
                    <Register />
                  </AuthLayout>
                }
            />

            {/* Public pages */}
            <Route
                path="/films"
                element={
                  <MainLayout>
                    <FilmsList />
                  </MainLayout>
                }
            />
            <Route
                path="/films/:id"
                element={
                  <MainLayout>
                    <FilmDetail />
                  </MainLayout>
                }
            />
            <Route
                path="/reserve/:seanceId"
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <SeatReservation />
                    </ProtectedRoute>
                  </MainLayout>
                }
            />
            <Route
                path="/payment/:reservationId"
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  </MainLayout>
                }
            />
            <Route
                path="/profile"
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </MainLayout>
                }
            />
            <Route
                path="/dashboard"
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  </MainLayout>
                }
            />

            {/* Redirect root to films */}
            <Route path="/" element={<Navigate to="/films" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
