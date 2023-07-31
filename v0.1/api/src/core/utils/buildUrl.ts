export const buildUrl = (url: string, params: Record<string, string>): string => Object
	.entries(params)
	.reduce((url: string, [ name, value ]) => url.replaceAll(`:${name}`, value), url)
