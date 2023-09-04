import { IDtoMapper } from '../../interfaces/dtoMapper'

export abstract class BaseDtoMapper<T, DTO> implements IDtoMapper<T, DTO> {
	protected abstract _toDTO(entity: T): DTO | undefined

	public toDTO(entity: T): DTO | undefined {
		try {
			return this._toDTO(entity)
		} catch (err) {
			return undefined
		}
	}
}
