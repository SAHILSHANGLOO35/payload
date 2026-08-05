import React from "react"
import { Container } from "../container"
import { SkeletonFeatures } from "./skeleton"

export const Features = () => {
  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 divide-x divide-y divide-dashed md:grid-cols-3 md:divide-y-0">
          <SkeletonFeatures
            title="Professional invoices"
            description="Create clean, modern invoices with customizable branding, currencies, layouts, and payment details that leave a lasting impression on every client."
          />

          <SkeletonFeatures
            title="Start instantly"
            description="Create your first invoice without signing up. When you're ready, sign in with Google to securely save, manage, and access your invoices anytime."
          />

          <SkeletonFeatures
            title="Built for speed"
            description="Create, Edit and manage invoices effortlessly with a fast, responsive experience designed for freelancers, firms and businesses."
          />
        </div>
      </Container>
    </section>
  )
}
