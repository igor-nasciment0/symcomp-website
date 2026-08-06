'use client'

import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import type { Engine } from 'tsparticles-engine'
import { loadSlim } from 'tsparticles-slim'

const ParticleBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: '#ffffff' },
          shape: { type: 'square' },
          size: { value: { min: 2, max: 5 } },
          move: { enable: true, speed: 2, direction: 'right', straight: true },
          number: { value: 50 },
          opacity: { value: 0.5 },
          collisions: { enable: true },
          links: { enable: false },
        },
        detectRetina: true,
      }}
    />
  )
}

export default ParticleBackground
