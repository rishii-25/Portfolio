import { SmoothScrollProvider } from '@/hooks/useSmoothScroll'
import Home from './pages/Home'

export default function App() {
  return (
    <SmoothScrollProvider>
      <Home />
    </SmoothScrollProvider>
  )
}
