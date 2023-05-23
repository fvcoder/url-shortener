import * as Dialog from "@radix-ui/react-dialog";

export function AddUrl() {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button className="px-4 py-2 text-white bg-blue-500 rounded-md">Add Url</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/25 fixed inset-0" />
				<Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-md">
					<header>
						<Dialog.Title className="font-semibold mb-2">Add Url</Dialog.Title>
						<Dialog.Description className="text-sm mb-4">Add a url to shorten</Dialog.Description>
					</header>
					<main>
						<label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
							Url
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="text"
								name="url"
								id="url"
								className="block w-full outline-none rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="https://domain.com/my/url"
							/>
						</div>
					</main>
					<footer className="mt-4 flex items-center justify-end gap-2">
						<Dialog.Close asChild>
							<button className="px-4 py-2 rounded-md bg-red-500 text-white" aria-label="Close">
								Cancel
							</button>
						</Dialog.Close>
						<button className="px-4 py-2 rounded-md bg-blue-500 text-white">Short</button>
					</footer>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
