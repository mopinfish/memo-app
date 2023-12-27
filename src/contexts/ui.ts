import React from 'react'

export type ErrorState = Error | null
export function createErrorInitialState(): ErrorState {
  return null
}

export function createSnackbarInitialState() {
  return {
    visible: false,
    message: '',
    label: 'Done',
  }
}

export enum Status {
  LOADING = 'loading',
  FIRST_OPEN = 'firstOpen',
  UN_AUTHORIZED = 'unAuthorized',
  AUTHORIZED = 'authorized',
}

export function createApplicationInitialState(): Status {
  return Status.LOADING
}

export const Context = React.createContext({
  error: createErrorInitialState(),
  setError: (_: ErrorState) => {
    console.log(_)
  },
  snackbar: createSnackbarInitialState(),
  setSsetError: (_: ErrorState) => {
    console.log(_)
  },
  applicationState: createApplicationInitialState(),
  setApsetError: (_: ErrorState) => {
    console.log(_)
  },
})
