import React from "react"
import { Container } from "./container"

export const Hero = () => {
  return (
    <Container className="grid grid-cols-2 divide-x divide-dashed">
      <div className="px-4">Left half</div>
      <div className="px-4">Right half</div>
    </Container>
  )
}
