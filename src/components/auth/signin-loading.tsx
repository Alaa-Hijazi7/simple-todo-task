export function SignInLoading() {
  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header skeleton */}
      <div className="text-center space-y-2">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
      </div>
      
      {/* Form skeleton */}
      <div className="space-y-6">
        {/* Email field skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
          <div className="h-9 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Password field skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          <div className="h-9 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      {/* Footer skeleton */}
      <div className="text-center">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mx-auto"></div>
      </div>
    </div>
  )
}
