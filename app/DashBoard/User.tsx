"use client";
import React, { useRef, useState, useEffect } from 'react';
import Modal from './Modal';
import Files from "@/components/Files";


const User: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
	const [cid, setCid] = useState("");
	const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileDescription, setFileDescription] = useState("");

	const inputFile = useRef<HTMLInputElement | null>(null);

   
    useEffect(() => {
        const storedFiles = localStorage.getItem("uploadedFiles");
        if (storedFiles) {
            setUploadedFiles(JSON.parse(storedFiles));
        }
    }, []);

	const uploadFile = async (fileToUpload: File) => {
		try {
			setUploading(true);
			const formData = new FormData();
			formData.append("file", fileToUpload, `${fileToUpload.name}`);
			const request = await fetch("/api/files", {
				method: "POST",
				body: formData,
			});
			const response = await request.json();
			setCid(response.IpfsHash);

            const newFile = {
                cid: response.IpfsHash,
                name: fileName,
                description: fileDescription,
                time: new Date().toLocaleString(),
                link: `/ipfs/${response.IpfsHash}`,
            };

            const updatedFiles = [newFile, ...uploadedFiles];
            setUploadedFiles(updatedFiles);

            // Save uploaded files to localStorage
            localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));

			setUploading(false);
		} catch (e) {
			console.log(e);
			setUploading(false);
			alert("Trouble uploading file");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files ? e.target.files[0] : null;
		setFile(selectedFile);
        setModalOpen(true);
	};

	const handleFormSubmit = () => {
        if (file) {
            uploadFile(file);
            setModalOpen(false);
            setFileName("");
            setFileDescription("");
        }
	};

    return (
        <div>
            <div className="flex flex-col justify-center items-start mt-20 w-1/2 space-y-6 ml-30">
                <div className="flex flex-col space-y-6">
                    <button
                        disabled={uploading}
                        onClick={() => inputFile.current?.click()}
                        className="w-[150px] bg-secondary text-light rounded-3xl py-2 px-4 hover:bg-accent hover:text-light transition-all duration-300 ease-in-out"
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
                <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    onChange={handleChange}
                    style={{ display: "none" }}
                />
                {uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-4">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex flex-col p-4 border border-gray-300 rounded-lg bg-gray-200">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-black">{file.name}</h3>
                                        <p className="text-gray-400">{file.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400">{file.time}</p>
                                        <a href={file.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            View File
                                        </a>
                                    </div>
                                </div>
                                <p className="text-gray-400">CID: {file.cid}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleFormSubmit}
                fileName={fileName}
                setFileName={setFileName}
                fileDescription={fileDescription}
                setFileDescription={setFileDescription}
            />
        </div>
    );
};

export default User;
