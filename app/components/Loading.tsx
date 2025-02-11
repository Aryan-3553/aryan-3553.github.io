import { memo } from 'react'

interface LoadingProps {
  fullScreen?: boolean
}

function Loading({ fullScreen = true }: LoadingProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-black z-50"
    : "flex items-center justify-center"

  return (
    <div className={containerClasses}>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  )
}

export default memo(Loading)


  
