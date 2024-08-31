import Fireworks from "react-canvas-confetti/dist/presets/fireworks"

export const Confetti = () => {
  return (
    <>
      <Fireworks autorun={{ speed: 3, duration:1000 }} />
    </>
  )
}
