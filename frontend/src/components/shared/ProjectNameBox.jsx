import React, { useState } from 'react';

const ProjectNameBox = ({ isOpen, onClose, onSave }) => {
    const [projectName, setProjectName] = useState('');

    const handleSave = () => {
        onSave(projectName);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-lg mb-4">Enter Project Name</h2>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectNameBox;