import { createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import config from '../config'

export const initialState = {
  loading: false,
  hasErrors: false,
  competitions: [],
}

const competitionsSlice = createSlice({
  name: 'competitions',
  initialState,
  reducers: {
    getCompetitions: state => {
      state.loading = true
    },
    getCompetitionsSuccess: (state, { payload }) => {
      state.competitions = payload
      state.loading = false
      state.hasErrors = false
    },
    getCompetitionsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getCompetitions, getCompetitionsSuccess, getCompetitionsFailure } = competitionsSlice.actions

export const competitionsSelector = state => state.competitions

export default competitionsSlice.reducer

export function fetchCompetitions() {
  return async dispatch => {
    dispatch(getCompetitions())

    try {
      const response = await axios.get('https://api.football-data.org/v2/competitions', {
        headers: {
          'X-Auth-Token': config.API_KEY,
          'Accept': 'application/json',}
      })
      dispatch(getCompetitionsSuccess(response.data.competitions))
    } catch (error) {
      dispatch(getCompetitionsFailure())
    }
  }
}