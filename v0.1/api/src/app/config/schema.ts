export const appConfigSchema = {
	host: {
		doc: 'The host to bind the server to.',
		format: 'ip-address',
		default: '0.0.0.0',
		env: 'HOST',
		arg: 'host'
	},
	port: {
		doc: 'The port to bind the server to.',
		format: 'port',
		default: 3000,
		env: 'PORT',
		arg: 'port'
	},
	baseUri: {
		doc: 'The API base URI, excluding API version, where routers will be mounted.',
		format: String,
		default: '/api'
	},
	body: {
		limit: {
			doc: 'Body size limit to use with body parser, in bytes.',
			format: Number,
			default: 10240000000
		}
	},
	proxy: {
		level: {
			doc: 'Number of proxies between de client and the application.',
			format: Number,
			default: 0
		}
	}
}
