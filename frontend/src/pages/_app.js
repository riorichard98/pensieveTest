import '@/styles/globals.css'
import withAuth from '../components/withAuth';

function MyApp({ Component, pageProps }) {
  // Additional logic can go here

  return <Component {...pageProps} />;
}

export default withAuth(MyApp);
// export default MyApp
