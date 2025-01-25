import React, { useState, useEffect, useRef } from 'react'

interface Particle {
	x: number
	y: number
	vx: number
	vy: number
	color: string
	size: number
	life: number
	alpha: number
}

interface FireworksProps {
	numberOfParticles?: number
	colors?: string[]
	particleSize?: number
	minSpeed?: number
	maxSpeed?: number
	minLife?: number
	maxLife?: number
	gravity?: number
	fadeOut?: boolean
	burstTimeout?: number
	burstCount?: number
}

export const Fireworks: React.FC<FireworksProps> = ({
	numberOfParticles = 200,
	colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
	particleSize = 3,
	minSpeed = 1,
	maxSpeed = 5,
	minLife = 1,
	maxLife = 3,
	gravity = 0.1,
	fadeOut = true,
	burstTimeout = 1000,
	burstCount = 5
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [particles, setParticles] = useState<Particle[]>([])
	const [burstIndex, setBurstIndex] = useState(0)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		let animationFrameId: number

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const createParticles = () => {
			const newParticles: Particle[] = []
			const centerX = canvas.width / 2
			const centerY = canvas.height / 2

			for (let i = 0; i < numberOfParticles; i++) {
				const angle = Math.random() * 2 * Math.PI
				const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed
				const color = colors[Math.floor(Math.random() * colors.length)]
				const life = Math.random() * (maxLife - minLife) + minLife

				newParticles.push({
					x: centerX,
					y: centerY,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					color: color,
					size: particleSize,
					life: life,
					alpha: 1
				})
			}
			setParticles(prevParticles => [...prevParticles, ...newParticles])
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			setParticles(prevParticles => {
				const updatedParticles = prevParticles
					.map(particle => {
						const updatedParticle = {
							...particle,
							x: particle.x + particle.vx,
							y: particle.y + particle.vy,
							vy: particle.vy + gravity,
							life: particle.life - 0.01
						}
						if (fadeOut) {
							updatedParticle.alpha = Math.max(0, updatedParticle.life)
						}
						return updatedParticle
					})
					.filter(particle => particle.life > 0)
				return updatedParticles
			})

			particles.forEach(particle => {
				ctx.beginPath()
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
				ctx.fillStyle = particle.color
				ctx.globalAlpha = particle.alpha
				ctx.fill()
				ctx.globalAlpha = 1
			})
			animationFrameId = requestAnimationFrame(animate)
		}

		const launchBurst = () => {
			if (burstIndex < burstCount) {
				createParticles()
				setBurstIndex(prevIndex => prevIndex + 1)
			}
		}

		launchBurst()
		animate()

		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [
		burstIndex,
		burstCount,
		colors,
		fadeOut,
		gravity,
		maxLife,
		maxSpeed,
		minLife,
		minSpeed,
		numberOfParticles,
		particleSize,
		burstTimeout,
		particles
	])

	return <canvas ref={canvasRef} style={{ top: 0, left: 0, pointerEvents: 'none' }} />
}
