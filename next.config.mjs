/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	return config;
}

export default defineNextConfig({
	reactStrictMode: true,
	images: {
		domains: [
			'ipfs.io',
			'cloudflare-ipfs.com',
			'ikzttp.mypinata.cloud',
			'live---metadata-5covpqijaa-uc.a.run.app',
		], // <== Domain name
	},
	swcMinify: true,
});

webpack: (config, { isServer }) => {
	if (!isServer) {
	  config.resolve.fallback.fs = false
	}
	return config
  }