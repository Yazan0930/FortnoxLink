/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UnAuthImport } from './routes/_unAuth'
import { Route as AuthImport } from './routes/_auth'

// Create Virtual Routes

const AuthIndexLazyImport = createFileRoute('/_auth/')()
const UnAuthLoginLazyImport = createFileRoute('/_unAuth/login')()
const AuthWalletLazyImport = createFileRoute('/_auth/wallet')()
const AuthStatisticsLazyImport = createFileRoute('/_auth/statistics')()
const AuthPaymentsLazyImport = createFileRoute('/_auth/payments')()
const AuthMessagesLazyImport = createFileRoute('/_auth/messages')()
const AuthCommentsLazyImport = createFileRoute('/_auth/comments')()

// Create/Update Routes

const UnAuthRoute = UnAuthImport.update({
  id: '/_unAuth',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexLazyRoute = AuthIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth.index.lazy').then((d) => d.Route))

const UnAuthLoginLazyRoute = UnAuthLoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => UnAuthRoute,
} as any).lazy(() => import('./routes/_unAuth.login.lazy').then((d) => d.Route))

const AuthWalletLazyRoute = AuthWalletLazyImport.update({
  id: '/wallet',
  path: '/wallet',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth.wallet.lazy').then((d) => d.Route))

const AuthStatisticsLazyRoute = AuthStatisticsLazyImport.update({
  id: '/statistics',
  path: '/statistics',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth.statistics.lazy').then((d) => d.Route),
)

const AuthPaymentsLazyRoute = AuthPaymentsLazyImport.update({
  id: '/payments',
  path: '/payments',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth.payments.lazy').then((d) => d.Route),
)

const AuthMessagesLazyRoute = AuthMessagesLazyImport.update({
  id: '/messages',
  path: '/messages',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth.messages.lazy').then((d) => d.Route),
)

const AuthCommentsLazyRoute = AuthCommentsLazyImport.update({
  id: '/comments',
  path: '/comments',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth.comments.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_unAuth': {
      id: '/_unAuth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UnAuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/comments': {
      id: '/_auth/comments'
      path: '/comments'
      fullPath: '/comments'
      preLoaderRoute: typeof AuthCommentsLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/messages': {
      id: '/_auth/messages'
      path: '/messages'
      fullPath: '/messages'
      preLoaderRoute: typeof AuthMessagesLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/payments': {
      id: '/_auth/payments'
      path: '/payments'
      fullPath: '/payments'
      preLoaderRoute: typeof AuthPaymentsLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/statistics': {
      id: '/_auth/statistics'
      path: '/statistics'
      fullPath: '/statistics'
      preLoaderRoute: typeof AuthStatisticsLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/wallet': {
      id: '/_auth/wallet'
      path: '/wallet'
      fullPath: '/wallet'
      preLoaderRoute: typeof AuthWalletLazyImport
      parentRoute: typeof AuthImport
    }
    '/_unAuth/login': {
      id: '/_unAuth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof UnAuthLoginLazyImport
      parentRoute: typeof UnAuthImport
    }
    '/_auth/': {
      id: '/_auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthIndexLazyImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthCommentsLazyRoute: typeof AuthCommentsLazyRoute
  AuthMessagesLazyRoute: typeof AuthMessagesLazyRoute
  AuthPaymentsLazyRoute: typeof AuthPaymentsLazyRoute
  AuthStatisticsLazyRoute: typeof AuthStatisticsLazyRoute
  AuthWalletLazyRoute: typeof AuthWalletLazyRoute
  AuthIndexLazyRoute: typeof AuthIndexLazyRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthCommentsLazyRoute: AuthCommentsLazyRoute,
  AuthMessagesLazyRoute: AuthMessagesLazyRoute,
  AuthPaymentsLazyRoute: AuthPaymentsLazyRoute,
  AuthStatisticsLazyRoute: AuthStatisticsLazyRoute,
  AuthWalletLazyRoute: AuthWalletLazyRoute,
  AuthIndexLazyRoute: AuthIndexLazyRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface UnAuthRouteChildren {
  UnAuthLoginLazyRoute: typeof UnAuthLoginLazyRoute
}

const UnAuthRouteChildren: UnAuthRouteChildren = {
  UnAuthLoginLazyRoute: UnAuthLoginLazyRoute,
}

const UnAuthRouteWithChildren =
  UnAuthRoute._addFileChildren(UnAuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof UnAuthRouteWithChildren
  '/comments': typeof AuthCommentsLazyRoute
  '/messages': typeof AuthMessagesLazyRoute
  '/payments': typeof AuthPaymentsLazyRoute
  '/statistics': typeof AuthStatisticsLazyRoute
  '/wallet': typeof AuthWalletLazyRoute
  '/login': typeof UnAuthLoginLazyRoute
  '/': typeof AuthIndexLazyRoute
}

export interface FileRoutesByTo {
  '': typeof UnAuthRouteWithChildren
  '/comments': typeof AuthCommentsLazyRoute
  '/messages': typeof AuthMessagesLazyRoute
  '/payments': typeof AuthPaymentsLazyRoute
  '/statistics': typeof AuthStatisticsLazyRoute
  '/wallet': typeof AuthWalletLazyRoute
  '/login': typeof UnAuthLoginLazyRoute
  '/': typeof AuthIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_unAuth': typeof UnAuthRouteWithChildren
  '/_auth/comments': typeof AuthCommentsLazyRoute
  '/_auth/messages': typeof AuthMessagesLazyRoute
  '/_auth/payments': typeof AuthPaymentsLazyRoute
  '/_auth/statistics': typeof AuthStatisticsLazyRoute
  '/_auth/wallet': typeof AuthWalletLazyRoute
  '/_unAuth/login': typeof UnAuthLoginLazyRoute
  '/_auth/': typeof AuthIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/comments'
    | '/messages'
    | '/payments'
    | '/statistics'
    | '/wallet'
    | '/login'
    | '/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/comments'
    | '/messages'
    | '/payments'
    | '/statistics'
    | '/wallet'
    | '/login'
    | '/'
  id:
    | '__root__'
    | '/_auth'
    | '/_unAuth'
    | '/_auth/comments'
    | '/_auth/messages'
    | '/_auth/payments'
    | '/_auth/statistics'
    | '/_auth/wallet'
    | '/_unAuth/login'
    | '/_auth/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  UnAuthRoute: typeof UnAuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  UnAuthRoute: UnAuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_unAuth"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/comments",
        "/_auth/messages",
        "/_auth/payments",
        "/_auth/statistics",
        "/_auth/wallet",
        "/_auth/"
      ]
    },
    "/_unAuth": {
      "filePath": "_unAuth.tsx",
      "children": [
        "/_unAuth/login"
      ]
    },
    "/_auth/comments": {
      "filePath": "_auth.comments.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/messages": {
      "filePath": "_auth.messages.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/payments": {
      "filePath": "_auth.payments.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/statistics": {
      "filePath": "_auth.statistics.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/wallet": {
      "filePath": "_auth.wallet.lazy.tsx",
      "parent": "/_auth"
    },
    "/_unAuth/login": {
      "filePath": "_unAuth.login.lazy.tsx",
      "parent": "/_unAuth"
    },
    "/_auth/": {
      "filePath": "_auth.index.lazy.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
