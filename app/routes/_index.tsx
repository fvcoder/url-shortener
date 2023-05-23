import { ChevronDownIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import { Content, Item, Portal, Root, Trigger } from "@radix-ui/react-dropdown-menu";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";

import { AddUrl } from "~/module/ui/infra/addUrl";

interface indexLoader {
	urls: Array<{
		id: string;
		slug: string;
		original: string;
		url: string;
		views: number;
		created: string;
	}>;
}

export const loader: LoaderFunction = () => {
	return json<indexLoader>({
		urls: [
			{
				id: "randomid",
				slug: "sh0rt",
				original: "https://tailwindui.com/components/application-ui/lists/tables",
				url: "bit.com/sh0rt",
				views: 14,
				created: "2023-05-22T23:52:11.025Z",
			},
		],
	});
};

export default function Index() {
	const { urls } = useLoaderData<indexLoader>();
	const navigate = useNavigate();

	return (
		<div className="py-10 px-4">
			<header className="flex gap-4 items-center justify-between">
				<div>
					<h1 className="font-semibold leading-6 text-base text-gray-900">Links acortados</h1>
					<p className="text-gray-700 textsm mb-2">
						Aqui encontraras los links acortados, sus origenes y autores
					</p>
				</div>
				<div className="flex-none">
					<AddUrl />
				</div>
			</header>
			<main className="mt-6">
				<ul>
					{urls.map((x, i) => (
						<li key={`link-${i}`} className="flex items-center gap-2 w-full py-1">
							<div className="qr">
								<QrCodeIcon className="w-8" />
							</div>
							<Link to={`/${x.slug}/detall`} className="flex-1 min-w-0">
								<h3 className="truncate text-blue-500">{x.url}</h3>
								<small className="truncate block w-full">{x.original}</small>
							</Link>
							<div className="text-sm hidden md:block">{x.created}</div>
							<Root>
								<Trigger asChild>
									<button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 active:bg-gray-100 focus:bg-gray-50 transition">
										<ChevronDownIcon className="w-4" />
									</button>
								</Trigger>
								<Portal>
									<Content
										sideOffset={5}
										align="end"
										className="min-w-[14rem] divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									>
										<Item
											className="text-gray-700 block px-4 py-2 text-sm"
											onClick={() => {
												navigator.clipboard
													.writeText(x.url)
													.finally(() => alert("Copied to clipboard"));
											}}
										>
											Copy Link
										</Item>
										<Item
											className="text-gray-700 block px-4 py-2 text-sm"
											onClick={() => navigate(`/${x.slug}/detall`)}
										>
											Detall
										</Item>
										<Item
											className="text-gray-700 block px-4 py-2 text-sm"
											onClick={() => navigate(`/${x.slug}/delete`)}
										>
											Delete
										</Item>
									</Content>
								</Portal>
							</Root>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}
