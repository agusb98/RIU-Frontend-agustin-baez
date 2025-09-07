/**
 * Interface para metadata de paginación
 */
export interface PaginationMetadata {
  current_page: number;
  page_size: number;
  total_elements: number;
  total_pages: number;
  is_first: boolean;
  is_last: boolean;
  has_next: boolean;
  has_previous: boolean;
}

/**
 * Interface genérica para respuestas paginadas
 * @template T Tipo de datos contenidos en la respuesta
 */
export interface PaginatedResponse<T> {
  content: T[];
  pagination: PaginationMetadata;
}

/**
 * Tipo de utilidad para parámetros de paginación en requests
 */
export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}
