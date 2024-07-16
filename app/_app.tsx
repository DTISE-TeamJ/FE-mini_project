// pages/_app.tsx (or app/layout.tsx)
import { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default MyApp;