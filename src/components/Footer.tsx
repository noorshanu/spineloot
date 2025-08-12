
import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-casino-bg py-10">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white/60">© 2025 SpinLoot ($SPIN). All rights reserved.</div>
        <div className="flex items-center gap-4 text-white/80">
          <a href="#">Twitter</a>
          <a href="#">Telegram</a>
          <a href="#">Docs</a>
        </div>
      </Container>
    </footer>
  )
}
