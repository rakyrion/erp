import { HydratedDocument } from 'mongoose'
import { IPersistenceMapper } from '../../interfaces/persistenceMapper'
import { IEntity } from '../../interfaces/entity'

export abstract class BasePersistenceMapper<T extends IEntity> implements IPersistenceMapper<T> {
	protected abstract _fromDB(entity: T & { _id?: string } | HydratedDocument<T>): T
	protected abstract _toDB(entity: Partial<T>): HydratedDocument<T>

	public fromDB(entity: T & { _id?: string } | HydratedDocument<T>): T {
		if (entity.id && typeof entity.id !== 'string') return entity
		return this._fromDB(entity)
	}

	public toDB(entity: Partial<T>): HydratedDocument<T> {
		if (typeof entity === 'string') return { _id: entity } as unknown as HydratedDocument<T>
		if (!Object.keys(entity).length) return { _id: String(entity) } as unknown as HydratedDocument<T>
		return this._toDB(entity)
	}
}
