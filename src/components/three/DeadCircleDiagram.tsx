import { motion } from 'framer-motion';

/**
 * "Dead Circle" diagram (the-three.md §6): three moon nodes within 30 feet of
 * each other, the coven circle rendered as a broken dashed ring that draws in
 * and sparks hag-green at its two break points.
 */
export default function DeadCircleDiagram() {
  return (
    <figure className="mx-auto mt-12 max-w-[520px]">
      <motion.svg
        viewBox="0 0 400 340"
        className="w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        aria-label="Diagram: three hags seated in a dead coven circle"
      >
        {/* broken dashed ring — two arcs with gaps at lower-left and right */}
        <motion.path
          d="M 286 118 A 100 100 0 1 1 121 260"
          fill="none"
          stroke="#5E8A2E"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
          transition={{ delay: 0.9, duration: 1.4, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 200 100 A 100 100 0 0 1 290 132"
          fill="none"
          stroke="#5E8A2E"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
          transition={{ delay: 0.9, duration: 1.4, ease: 'easeInOut' }}
        />

        {/* sparks at the two break points — one flash each */}
        {[
          { x: 293, y: 125 },
          { x: 117, y: 266 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="6"
            fill="#9FD63F"
            variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: [0, 1, 0], scale: [0, 1.4, 0.6] } }}
            transition={{ delay: 2.3 + i * 0.15, duration: 0.3 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}

        {/* three moon nodes — triangle first */}
        {[
          { x: 200, y: 145, name: 'Morgha', dy: -26 },
          { x: 140, y: 235, name: 'Raspka', dy: 40 },
          { x: 260, y: 235, name: 'Veshka', dy: 40 },
        ].map((n, i) => (
          <motion.g
            key={n.name}
            variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1 } }}
            transition={{ delay: i * 0.2, duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="22" fill="#1B1132" stroke="#B98A3E" strokeWidth="1.5" />
            {/* crescent */}
            <path
              d={`M ${n.x + 6} ${n.y - 10} a 11 11 0 1 0 0 20 a 8.5 8.5 0 1 1 0 -20 Z`}
              fill="#B98A3E"
            />
            <text
              x={n.x}
              y={n.y + n.dy}
              textAnchor="middle"
              fill="#9A8FB5"
              fontSize="12"
              fontFamily="'IBM Plex Mono', monospace"
              letterSpacing="2"
              style={{ textTransform: 'uppercase' }}
            >
              {n.name.toUpperCase()}
            </text>
          </motion.g>
        ))}

        {/* within-30-feet measure ticks */}
        <motion.text
          x="200"
          y="208"
          textAnchor="middle"
          fill="#5E8A2E"
          fontSize="11"
          fontFamily="'IBM Plex Mono', monospace"
          letterSpacing="1.5"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          within 30 ft. — out of habit
        </motion.text>
      </motion.svg>
      <motion.figcaption
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-4 text-center font-body text-sm italic leading-relaxed text-mist"
      >
        They sit within 30 feet of each other out of habit. Let the party notice them flinch when
        nothing answers.
      </motion.figcaption>
    </figure>
  );
}
