import { HydratedDocument } from 'mongoose'

export interface IPersistenceMapper<T> {
	fromDB(entity: T & { _id?: string } | HydratedDocument<T>): T,
	toDB(entity: Partial<T>): HydratedDocument<T>
}
