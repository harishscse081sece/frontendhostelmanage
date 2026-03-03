import React from 'react';
import { toast } from 'react-toastify';
import API_URL from '../../config/api';

const ComplaintManager = ({ complaint, onUpdate }) => {
    const handleStatusUpdate = async (newStatus) => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`${API_URL}/complaints/${complaint._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            
            if (response.ok) {
                toast.success('Status updated successfully!');
                onUpdate();
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    const getStatusBadge = () => {
        const status = complaint.status || 'Pending';
        
        if (status === 'Solved') {
            return (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    ✓ Solved
                </span>
            );
        }
        return (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                ⏳ Pending
            </span>
        );
    };

    return (
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{complaint.type}</h3>
                        {getStatusBadge()}
                    </div>
                    <p className="text-gray-600 mt-2 leading-relaxed">{complaint.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                        <p className="text-sm text-gray-500">
                            👤 {complaint.studentName}
                        </p>
                        <p className="text-sm text-gray-500">
                            📅 {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-sm text-gray-500">
                            🕐 {new Date(complaint.createdAt).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>
                
                <div className="ml-4">
                    {(complaint.status === 'Pending' || !complaint.status) && (
                        <button
                            onClick={() => handleStatusUpdate('Solved')}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm"
                        >
                            ✓ Mark as Solved
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplaintManager;
