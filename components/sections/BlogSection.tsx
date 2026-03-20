import Container from "../layout/Container"
import BlogCard from "../cards/BlogCard"

export default function BlogSection({blogs}) {

  return (
    <section className="py-24 bg-gray-50">

      <Container>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="text-4xl font-semibold tracking-tight">
            Travel Guides
          </h2>

          <p className="mt-4 text-gray-600">
            Inspiration, tips, and guides to help you explore Cambodia.
          </p>

        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}

        </div>

      </Container>

    </section>
  )
}