'use client'

import { useEffect } from 'react'
import { State } from '@global/store'
import { navSecondaryRoutes } from '@global/config/routes'
import InitPageState from '@aurora/views/init/pageState'

function Layout({ children }: { children: React.ReactNode }) {
  const _setPage = State((state) => state.setPage)
  const _setNavRoute = State((state) => state.setNavRoute)
  const _setBackRoute = State((state) => state.setBackRoute)

  useEffect(() => {
    InitPageState(
      _setPage,
      _setBackRoute,
      _setNavRoute,
      navSecondaryRoutes.portfolio,
    )
    // _setPage('Portfolio')
    // _setBackRoute('/portfolio')
    // _setNavRoute([
    //   {
    //     title: 'Graphics',
    //     path: '/portfolio/graphics',
    //   },
    //   {
    //     title: 'Dev',
    //     path: '/portfolio/dev',
    //   },
    // ])
  }, [_setPage, _setNavRoute, _setBackRoute])

  return <div className='relative h-screen w-screen'>{children}</div>
}

export default Layout