import { createContext, useContext } from 'react';

// Create Context object.
const XmtpContext = createContext(null);

// Export Provider.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function XmtpProvider(props: any) {
	const { value, children } = props;

	return <XmtpContext.Provider value={value}>{children}</XmtpContext.Provider>;
}

// Export useContext Hook.
export function useMenuContext() {
	return useContext(XmtpContext);
}
