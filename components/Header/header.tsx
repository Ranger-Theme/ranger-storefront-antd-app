import Logo from '@/components/Logo'
import Navigation from '@/components/Navigation'

const Header = () => {
  return (
    <>
      <div className="header-closed auto-cols-fr bg-header border-b border-subtle grid h-auto justify-center px-4 top-0 sticky w-full z-header lg_px-8">
        <div className="header-toolbar border-0 content-center gap-x-4 grid grid-cols-3 grid-rows-header h-14 items-center justify-self-center max-w-site w-full z-header lg_h-20 lg_gap-x-8 lg_grid-cols-12">
          <Logo />
          <Navigation />
        </div>
      </div>
    </>
  )
}

export default Header
