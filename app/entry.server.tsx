/* eslint-disable no-param-reassign */
/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	return isbot(request.headers.get("user-agent"))
		? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
		: handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

async function handleBotRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	return new Promise((resolve, reject) => {
		const { pipe, abort } = renderToPipeableStream(
			<RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
			{
				onAllReady() {
					const body = new PassThrough();

					responseHeaders.set("Content-Type", "text/html");

					resolve(
						new Response(body, {
							headers: responseHeaders,
							status: responseStatusCode,
						})
					);

					pipe(body);
				},
				onShellError(error: unknown) {
					reject(error);
				},
				onError(error: unknown) {
					responseStatusCode = 500;
					console.error(error);
				},
			}
		);

		setTimeout(abort, ABORT_DELAY);
	});
}

async function handleBrowserRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	return new Promise((resolve, reject) => {
		const { pipe, abort } = renderToPipeableStream(
			<RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
			{
				onShellReady() {
					const body = new PassThrough();

					responseHeaders.set("Content-Type", "text/html");

					resolve(
						new Response(body, {
							headers: responseHeaders,
							status: responseStatusCode,
						})
					);

					pipe(body);
				},
				onShellError(error: unknown) {
					reject(error);
				},
				onError(error: unknown) {
					console.error(error);
					responseStatusCode = 500;
				},
			}
		);

		setTimeout(abort, ABORT_DELAY);
	});
}
