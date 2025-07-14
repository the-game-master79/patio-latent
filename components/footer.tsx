import { Container } from "./ui/container"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Reclaim. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
