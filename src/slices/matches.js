import { createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import config from '../config'

export const initialState = {
  loading: false,
  hasErrors: false,
  matches: [],
}

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    getMatches: state => {
      state.loading = true
    },
    getMatchesSuccess: (state, { payload }) => {
      state.competition = payload.competition
      state.matches = payload.matches
      state.loading = false
      state.hasErrors = false
    },
    getMatchesFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getMatches, getMatchesSuccess, getMatchesFailure } = matchesSlice.actions

export const matchesSelector = state => state.matches

export default matchesSlice.reducer

export function fetchMatches(id) {
  return async dispatch => {
    dispatch(getMatches())

    try {
      const response = await axios.get(`https://api.football-data.org/v2/competitions/${id}/matches`, {
        headers: {
          'X-Auth-Token': config.API_KEY,
          'Accept': 'application/json',}
      })
      dispatch(getMatchesSuccess({'competition': `${response.data.competition.name} (${response.data.competition.area.name})`, 'matches': response.data.matches}))
    } catch (error) {
      dispatch(getMatchesFailure())
    }
  }
}