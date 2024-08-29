"use client";

import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Files from "@/components/Files";

export default function Home() {
	const [file, setFile] = useState("");
	const [cid, setCid] = useState("");
	const [uploading, setUploading] = useState(false);

	const inputFile: any = useRef(null);

	const uploadFile = async (fileToUpload: any) => {
		try {
			setUploading(true);
			const formData = new FormData();
			formData.append("file", fileToUpload, `${fileToUpload.name}`);
			const request = await fetch("/api/files", {
				method: "POST",
				body: formData,
			});
			const response = await request.json();
			console.log(response);
			setCid(response.IpfsHash);
			setUploading(false);
		} catch (e) {
			console.log(e);
			setUploading(false);
			alert("Trouble uploading file");
		}
	};

	const handleChange = (e: any) => {
		setFile(e.target.files[0]);
		uploadFile(e.target.files[0]);
	};

	const loadRecent = async () => {
		try {
			const res = await fetch("/api/files");
			const json = await res.json();
			setCid(json.ipfs_pin_hash);
		} catch (e) {
			console.log(e);
			alert("trouble loading files");
		}
	};

	return (
		<>
			<Head>
				<title>BlockFL</title>
				<meta name="description" content="Generated with create-pinata-app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/pinnie.png" />
			</Head>
			<main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
				<div className="w-full h-full m-auto bg-heroImage bg-cover bg-center flex flex-col justify-center items-center">
					<div className="h-full max-w-screen-xl">
						<div className="w-full m-auto mt-16 flex justify-start items-center">
							
						</div>
						<div className="h-full w-full m-auto flex justify-center items-center gap-8">
							<div className="w-1/2 flex flex-col gap-6">
								<h1>BlockFl</h1>
								
								<input
									type="file"
									id="file"
									ref={inputFile}
									onChange={handleChange}
									style={{ display: "none" }}
								/>
								<div>
									<button
										onClick={loadRecent}
										className="mr-10 w-[150px] bg-light text-secondary border-2 border-secondary rounded-3xl py-2 px-4 hover:bg-secondary hover:text-light transition-all duration-300 ease-in-out"
									>
										Load recent
									</button>
									<button
										disabled={uploading}
										onClick={() => inputFile.current.click()}
										className="w-[150px] bg-secondary text-light rounded-3xl py-2 px-4 hover:bg-accent hover:text-light transition-all duration-300 ease-in-out"
									>
										{uploading ? "Uploading..." : "Upload"}
									</button>
								</div>
								{cid && <Files cid={cid} />}
							</div>
						
						</div>
					</div>
					
				
				</div>
			</main>
		</>
	);
}
