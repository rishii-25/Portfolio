import { useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Node {
  id: number
  x: number
  y: number
  baseX: number
  baseY: number
  r: number
  phase: number
  isHub: boolean
  el: SVGCircleElement | null
  ringEl: SVGCircleElement | null
}

interface Connection {
  from: number
  to: number
  hasFlow: boolean
  lineEl: SVGLineElement | null
  flowEl: SVGLineElement | null
}

function generateNetwork(width: number, height: number, isMobile: boolean) {
  const maxNodes = isMobile ? 40 : 80
  const nodes: Node[] = []
  let nodeId = 0

  // Subdivided grid placement
  const cols = isMobile ? 3 : 5
  const rows = isMobile ? 3 : 4
  const cellW = width / cols
  const cellH = height / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (nodes.length >= maxNodes) break

      const subdivide = Math.random() > 0.5
      const subCols = subdivide ? 2 : 1
      const subRows = subdivide ? 2 : 1
      const count = Math.floor(Math.random() * 2) + 1

      for (let i = 0; i < count && nodes.length < maxNodes; i++) {
        const sc = Math.floor(Math.random() * subCols)
        const sr = Math.floor(Math.random() * subRows)
        const sx = c * cellW + (sc * cellW) / subCols + Math.random() * (cellW / subCols) * 0.8 + (cellW / subCols) * 0.1
        const sy = r * cellH + (sr * cellH) / subRows + Math.random() * (cellH / subRows) * 0.8 + (cellH / subRows) * 0.1

        nodes.push({
          id: nodeId++,
          x: sx,
          y: sy,
          baseX: sx,
          baseY: sy,
          r: Math.random() > 0.8 ? 3.5 : 2,
          phase: Math.random() * Math.PI * 2,
          isHub: false,
          el: null,
          ringEl: null,
        })
      }
    }
  }

  // Mark hub nodes (most connected)
  const connectionRadius = isMobile ? 150 : 200
  const connections: Connection[] = []

  for (let i = 0; i < nodes.length; i++) {
    const distances: { idx: number; dist: number }[] = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < connectionRadius) {
        distances.push({ idx: j, dist })
      }
    }
    distances.sort((a, b) => a.dist - b.dist)
    const connectCount = Math.min(distances.length, Math.floor(Math.random() * 3) + 2)

    for (let k = 0; k < connectCount; k++) {
      const target = distances[k].idx
      const exists = connections.some(
        (c) => (c.from === i && c.to === target) || (c.from === target && c.to === i)
      )
      if (!exists) {
        connections.push({
          from: i,
          to: target,
          hasFlow: Math.random() < 0.3,
          lineEl: null,
          flowEl: null,
        })
      }
    }
  }

  // Mark hub nodes
  const connectionCounts = new Array(nodes.length).fill(0)
  connections.forEach((c) => {
    connectionCounts[c.from]++
    connectionCounts[c.to]++
  })
  const maxConnections = Math.max(...connectionCounts)
  nodes.forEach((n, i) => {
    if (connectionCounts[i] > maxConnections * 0.6) {
      n.isHub = true
      n.r = 3.5
    }
  })

  return { nodes, connections }
}

export default function NeuralNetworkBackground() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<{ nodes: Node[]; connections: Connection[] } | null>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)
  const reducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    // Update CSS custom properties for glow
    containerRef.current.style.setProperty('--mouse-x', `${mouseRef.current.x}px`)
    containerRef.current.style.setProperty('--mouse-y', `${mouseRef.current.y}px`)
  }, [])

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return
    const svg = svgRef.current
    const isMobile = window.innerWidth < 768
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

    const { nodes, connections } = generateNetwork(width, height, isMobile)
    networkRef.current = { nodes, connections }

    // Create SVG elements
    const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    svg.appendChild(linesGroup)
    svg.appendChild(nodesGroup)

    // Create connection lines
    connections.forEach((conn) => {
      const from = nodes[conn.from]
      const to = nodes[conn.to]

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', String(from.x))
      line.setAttribute('y1', String(from.y))
      line.setAttribute('x2', String(to.x))
      line.setAttribute('y2', String(to.y))
      line.setAttribute('stroke', '#00D4FF')
      line.setAttribute('stroke-width', '0.5')
      line.setAttribute('stroke-opacity', reducedMotion ? '0.25' : '0.15')
      linesGroup.appendChild(line)
      conn.lineEl = line

      if (conn.hasFlow && !reducedMotion) {
        const flowLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        flowLine.setAttribute('x1', String(from.x))
        flowLine.setAttribute('y1', String(from.y))
        flowLine.setAttribute('x2', String(to.x))
        flowLine.setAttribute('y2', String(to.y))
        flowLine.setAttribute('stroke', '#00D4FF')
        flowLine.setAttribute('stroke-width', '1.5')
        flowLine.setAttribute('stroke-opacity', '0.6')
        flowLine.setAttribute('stroke-dasharray', '20 300')
        const delay = Math.random() * -4
        flowLine.style.animation = `flowMove 4s linear ${delay}s infinite`
        linesGroup.appendChild(flowLine)
        conn.flowEl = flowLine
      }
    })

    // Create nodes
    nodes.forEach((node) => {
      // Ring element
      if (!reducedMotion) {
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        ring.setAttribute('cx', String(node.x))
        ring.setAttribute('cy', String(node.y))
        ring.setAttribute('r', String(node.r))
        ring.setAttribute('fill', 'none')
        ring.setAttribute('stroke', '#00D4FF')
        ring.setAttribute('stroke-width', '0.5')
        ring.setAttribute('stroke-opacity', '0.3')
        ring.style.cssText = `--base-r: ${node.r}px;`
        ring.style.animation = `ringPulse 3s ease-out ${-node.phase}s infinite`
        nodesGroup.appendChild(ring)
        node.ringEl = ring
      }

      // Main node
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(node.x))
      circle.setAttribute('cy', String(node.y))
      circle.setAttribute('r', String(node.r))
      circle.setAttribute('fill', '#00D4FF')
      if (!reducedMotion) {
        circle.style.animation = `nodePulse 3s ease-in-out ${-node.phase}s infinite`
      }
      circle.classList.add('will-change-transform')
      nodesGroup.appendChild(circle)
      node.el = circle
    })

    // Add flow animation keyframes if not reduced motion
    if (!reducedMotion) {
      const styleEl = document.createElement('style')
      styleEl.textContent = `
        @keyframes flowMove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -320; }
        }
        @keyframes ringPulse {
          0% { r: var(--base-r); opacity: 0.4; }
          100% { r: calc(var(--base-r) * 4); opacity: 0; }
        }
      `
      svg.appendChild(styleEl)
    }

    // Cursor interaction via rAF
    const animate = () => {
      if (reducedMotion || isMobile) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const radius = 200
      const maxDisp = 15

      nodes.forEach((node) => {
        if (!node.el) return
        const dx = mx - node.baseX
        const dy = my - node.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < radius) {
          const force = (radius - dist) / radius
          const dispX = (dx / dist) * force * maxDisp
          const dispY = (dy / dist) * force * maxDisp
          node.el.setAttribute('transform', `translate(${dispX}, ${dispY})`)
          if (node.ringEl) {
            node.ringEl.setAttribute('transform', `translate(${dispX}, ${dispY})`)
          }
        } else {
          node.el.setAttribute('transform', 'translate(0, 0)')
          if (node.ringEl) {
            node.ringEl.setAttribute('transform', 'translate(0, 0)')
          }
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    if (!reducedMotion) {
      rafRef.current = requestAnimationFrame(animate)
    }

    // Mouse listener
    if (!isMobile) {
      containerRef.current.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
      }
      svg.innerHTML = ''
    }
  }, [reducedMotion, handleMouseMove])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 212, 255, 0.03) 0%, transparent 70%)',
      }}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: reducedMotion ? 0.6 : 1 }}
      />
    </div>
  )
}
