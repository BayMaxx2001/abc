import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from './utils/auth';

function AuthRouter({ children }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
export default AuthRouter;
