import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';

export default (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check authentication on mount
      if (!isAuthenticated()) {
        // Redirect to the login page if not authenticated
        router.push('/login');
      } else {
        // If authenticated, check if the user is trying to access the login page
        if (router.pathname === '/login') {
          // Redirect to the dashboard if already authenticated and trying to access login
          router.push('/dashboard');
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};
