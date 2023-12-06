// component for showing notification in modal form
export default ({ isOpen, message, onClose }) => {
    return (
        <div className={`fixed inset-0 z-10 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            {/* Modal Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="bg-white p-4 rounded shadow-md z-20">
                <p className="text-red-500 font-semibold">{message}</p>
                <button
                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
