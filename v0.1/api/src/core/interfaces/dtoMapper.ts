export interface IDtoMapper<T, DTO> {
	fromDTO?(entity: DTO): T,
	toDTO(entity: T): DTO | undefined
}
