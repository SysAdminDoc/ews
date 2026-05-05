const REMOVED_DASHBOARD_ROUTES = ['/military', '/untracked']

export default {
  fetch(request, env) {
    const { pathname } = new URL(request.url)
    const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname

    if (
      REMOVED_DASHBOARD_ROUTES.includes(normalizedPath) ||
      REMOVED_DASHBOARD_ROUTES.some((routePath) => normalizedPath.startsWith(`${routePath}/`))
    ) {
      return new Response('Not found', {
        status: 404,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
        },
      })
    }

    return env.ASSETS.fetch(request)
  },
}
