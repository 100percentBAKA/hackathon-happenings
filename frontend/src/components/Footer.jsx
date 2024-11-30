import React from 'react'

export default function Footer({isDarkMode}) {
  return (
    <>
        <div className={`${!isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
            <footer className={`${!isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} py-8`}>
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 AdGenius. All rights reserved.</p>
                    <p className="mt-2">Transforming digital advertising, one AI-generated ad at a time.</p>
                </div>
            </footer>
        </div>
    </>
    )
}
