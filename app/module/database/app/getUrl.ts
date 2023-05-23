export interface UrlProps {
	id: string;
	slug: string;
	original: string;
	url: string;
	views: number;
	created: string;
}

/**
 * Busca y procesa el link acortado
 * @param short Enlace acortado
 * @returns {string} Enlace destino
 */
export function getUrlFormSlug(short: string): string {
	return `https://domain.com/toRedirect/${short}`;
}
