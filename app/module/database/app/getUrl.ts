import { connectDb } from "./connect.db";

export interface UrlProps {
	id: string;
	slug: string;
	original: string;
	views: number;
	created: Date;
}

/**
 * Busca y procesa el link acortado
 * @param short Enlace acortado
 * @returns {string} Enlace destino
 */
export function getUrlFormSlug(short: string): string {
	return `https://domain.com/toRedirect/${short}`;
}

export async function getAllUrls(): Promise<UrlProps[]> {
	const db = await connectDb();
	const data = await db.models.url.find<UrlProps>({}).exec();

	return data.map((x) => ({
		id: x.id.toString(),
		slug: x.slug,
		original: x.original,
		views: x.views,
		created: x.created,
	}));
}
