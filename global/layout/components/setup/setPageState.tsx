'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  navPrimaryRoutes,
  navSecondaryRoutes,
  type tNavSecondaryRoutes,
} from '@global/config/routes'
import { State } from '@global/store'

function SetPageState() {
  const _setPage = State((state) => state.setPage)
  const _setNavRoute = State((state) => state.setNavRoute)
  const _setBackRoute = State((state) => state.setBackRoute)
  const _setNavRouteActiveState = State((state) => state.setNavRouteActiveState)

  const pathName = usePathname()

  useEffect(() => {
    const reqPath = pathName.slice(1).split('/')

    if (reqPath[0] in navSecondaryRoutes) {
      const routeData =
        navSecondaryRoutes[reqPath[0] as keyof tNavSecondaryRoutes]
      _setPage(routeData.title)
      _setBackRoute(routeData.setBackRoute)
      _setNavRoute(routeData.route)
      if (!reqPath[1]) {
        _setNavRouteActiveState({
          id: 99,
          scrollProgress: 0,
        })
      } else {
        navSecondaryRoutes[reqPath[0] as keyof tNavSecondaryRoutes].route.map(
          (v, i) => {
            if (pathName === v.path) {
              _setNavRouteActiveState({
                id: i,
                scrollProgress: 20,
              })
              _setPage(reqPath[0].slice(0, 4).toUpperCase() + '. ' + v.title)
            }
          },
        )
      }
    } else {
      _setPage('NOT FOUND')
      _setBackRoute('/home')
      _setNavRoute(navPrimaryRoutes)
      _setNavRouteActiveState({
        id: 99,
        scrollProgress: 0,
      })
    }
  }, [_setPage, _setNavRoute, _setBackRoute, _setNavRouteActiveState, pathName])
  return null
}

export default SetPageState
