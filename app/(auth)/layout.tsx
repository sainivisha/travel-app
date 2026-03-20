export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Travel Image */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9')",
        }}
      />

      {/* Right Auth Form */}
      <div className="flex items-center justify-center bg-white p-10">
        {children}
      </div>

    </div>
  )
}