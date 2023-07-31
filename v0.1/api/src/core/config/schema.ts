import { EEnv } from '../models/enumerations/env'


export const coreConfigSchema = {
	env: {
		doc: 'The application environment.',
		format: Object.values(EEnv),
		default: EEnv.DEVELOPMENT,
		env: 'NODE_ENV',
		arg: 'env'
	},
	amqp: {
		protocol: {
			doc: 'The AMQP protocol.',
			format: String,
			default: 'amqp'
		},
		hostname: {
			doc: 'The AMQP host.',
			format: String,
			default: 'localhost'
		},
		port: {
			doc: 'The AMQP port number.',
			format: Number,
			default: 5672
		},
		username: {
			doc: 'The AMQP username.',
			format: String,
			default: 'guest'
		},
		password: {
			doc: 'The AMQP password.',
			format: String,
			default: 'guest'
		},
		locale: {
			doc: 'The AMQP locale.',
			format: String,
			default: 'en_US'
		},
		frameMax: {
			doc: 'The AMQP maximum frame size (in bytes) allowed over the connection.',
			format: Number,
			default: 0x1000
		},
		heartbeat: {
			doc: 'The AMQP period of the connection heartbeat in seconds.',
			format: Number,
			default: 0
		},
		vhost: {
			doc: 'The AMQP virtual host.',
			format: String,
			default: '/'
		}
	},
	log: {
		console: {
			enable: {
				doc: 'Whether to enable or not console logging.',
				format: Boolean,
				default: true
			},
			verbose: {
				doc: 'Whether to add verbose level logs to console logging or not.',
				format: Boolean,
				default: false,
				env: 'LOG_CONSOLE_VERBOSE',
				arg: 'verbose'
			},
			debug: {
				doc: 'Whether to add debug level logs to console logging or not.',
				format: Boolean,
				default: false,
				env: 'LOG_CONSOLE_DEBUG',
				arg: 'debug'
			}
		},
		system: {
			enable: {
				doc: 'Whether to enable or not system logging.',
				format: Boolean,
				default: true
			},
			verbose: {
				doc: 'Whether to add verbose level logs to system logging or not.',
				format: Boolean,
				default: true
			}
		},
		debug: {
			enable: {
				doc: 'Whether to enable or not debug logging.',
				format: Boolean,
				default: true
			}
		}
	}
}
