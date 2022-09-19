import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import { ChakraProvider } from '@chakra-ui/react';
import { MetaMaskProvider } from 'metamask-react';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider>
			<MetaMaskProvider>
				<Component {...pageProps} />
			</MetaMaskProvider>
		</ChakraProvider>
	);
};

export default MyApp;
