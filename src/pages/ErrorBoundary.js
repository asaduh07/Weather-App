import React from "react";
function ErrorFallback({ resetErrorBoundary }) {
    
    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen p-4"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center',
                color: '#333', // Adjust text color for contrast
            }}
        >
            <h1 className="text-2xl font-bold mb-4">
                 Something went wrong
            </h1>
            <p className="text-lg mb-4">Please contact the admin or try again later.</p>
            <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                onClick={resetErrorBoundary} // Reload the page
            >
                Try Again
            </button>
        </div>
    );
}

export default ErrorFallback;