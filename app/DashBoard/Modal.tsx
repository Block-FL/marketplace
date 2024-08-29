import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    fileName: string;
    setFileName: (name: string) => void;
    fileDescription: string;
    setFileDescription: (desc: string) => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    fileName,
    setFileName,
    fileDescription,
    setFileDescription,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Upload File Details</h2>
                <input
                    type="text"
                    placeholder="File Name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="p-2 mb-4 border border-gray-300 rounded-md w-full"
                />
                <textarea
                    placeholder="File Description"
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    className="p-2 mb-4 border border-gray-300 rounded-md w-full"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
