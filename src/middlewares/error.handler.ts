export const errorHandler = (err: any, _req: any, res: any, _next: any) => {
	res.status(401).json({ error: 'No autorizado' })
}
