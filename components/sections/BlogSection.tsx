"use client";

import Container from "../layout/Container";
import BlogCard from "../cards/BlogCard";
import { motion } from "framer-motion";

export default function BlogSection({ blogs }: any) {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* 💡 VERY SOFT GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.05),transparent_60%)] pointer-events-none" />

      <Container>
        {/* ✨ HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Travel <span className="text-sky-600">Guides</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Inspiration, tips, and curated guides to help you explore smarter
            and deeper.
          </p>
        </motion.div>

        {/* 🧊 GRID */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogs?.map((blog: any, index: number) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease },
                },
              }}
              className="group"
            >
              {/* subtle glow */}
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-sky-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

                <div className="relative">
                  <BlogCard {...blog} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
