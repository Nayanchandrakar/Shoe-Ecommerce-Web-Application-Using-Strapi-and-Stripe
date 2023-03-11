import React from "react"

const ContentWrapper = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto w-full sm:px-8 xl:px-0 px-4 py-6">
            {children}
        </div>
    )
}

export default ContentWrapper
