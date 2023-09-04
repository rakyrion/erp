export const databaseConfigSchema = {
	connectionString: {
		doc: 'If defined, this is the connection string.',
		format: String,
		default: '',
		env: 'DATABASE',
		arg: 'db'
	},
	protocol: {
		doc: 'The database protocol.',
		format: String,
		default: 'mongodb+srv',
		env: 'DATABASE_PROTOCOL',
		arg: 'dbprotocol'
	},
	host: {
		doc: 'The database host address.',
		format: String,
		default: '',
		env: 'DATABASE_HOST',
		arg: 'dbhost'
	},
	username: {
		doc: 'The username to use in the database connection.',
		format: String,
		default: '',
		env: 'DATABASE_USERNAME',
		arg: 'dbuser'
	},
	password: {
		doc: 'The password to use in the database connection.',
		format: String,
		default: '',
		sensitive: true,
		env: 'DATABASE_PASSWORD',
		arg: 'dbpass'
	},
	name: {
		doc: 'The database name.',
		format: String,
		default: '',
		env: 'DATABASE_NAME',
		arg: 'dbname'
	},
	defaultPageSize: {
		doc: 'Collection default page size.',
		format: Number,
		default: 20
	},
	updateProduction: {
		doc: 'Whether to update database on production environment or not.',
		format: Boolean,
		default: false,
		arg: 'dbupdate'
	},
	connection: {
		family: {
			doc: 'Whether to use IPv4 or IPv6.',
			format: [ 4, 6 ],
			default: 4
		},
		poolSize: {
			min: {
				doc: 'Minimum number of socket connections.',
				format: Number,
				default: 20
			},
			max: {
				doc: 'Maximum number of socket connections.',
				format: Number,
				default: 100
			}
		},
		ssl: {
			doc: 'Whether to use SSL connections or not.',
			format: Boolean,
			default: true
		},
		sslValidate: {
			doc: 'Wheter to validate SSL certificates or not.',
			format: Boolean,
			default: true
		}
	},
	schema: {
		minimize: {
			doc: 'Value for default Schema "minimize" option.',
			format: Boolean,
			default: false
		},
		timestamps: {
			doc: 'Value for default Schema "timestamps" option.',
			format: Boolean,
			default: true
		},
		toJSON: {
			getters: {
				doc: 'Value for default Schema.toJSON "getters" option.',
				format: Boolean,
				default: true
			},
			virtuals: {
				doc: 'Value for default Schema.toJSON "virtuals" option.',
				format: Boolean,
				default: true
			},
			minimize: {
				doc: 'Value for default Schema.toJSON "minimize" option.',
				format: Boolean,
				default: false
			},
			versionKey: {
				doc: 'Value for default Schema.toJSON "versionKey" option.',
				format: Boolean,
				default: false
			}
		},
		toObject: {
			getters: {
				doc: 'Value for default Schema.toObject "getters" option.',
				format: Boolean,
				default: true
			},
			virtuals: {
				doc: 'Value for default Schema.toObject "virtuals" option.',
				format: Boolean,
				default: true
			},
			minimize: {
				doc: 'Value for default Schema.toObject "minimize" option.',
				format: Boolean,
				default: false
			},
			versionKey: {
				doc: 'Value for default Schema.toObject "versionKey" option.',
				format: Boolean,
				default: false
			}
		}
	}
}
