import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { fetchMatches, matchesSelector } from '../slices/matches'	

import MatchesTable from '../components/MatchesTable'

import { useParams } from 'react-router-dom';

const Matches = () => {

  const path = useHistory();
  const competitionId = useParams().competitionId;
  
  const dispatch = useDispatch()	
  const { competition, matches, loading, hasErrors } = useSelector(matchesSelector)	
  
  useEffect(() => {
    dispatch(fetchMatches(competitionId))
  }, [dispatch])

  const renderMatches = () => {
    if (loading) return <p>Loading matches...</p>
    if (hasErrors) return <p>Cannot display matches.</p>
    if (matches.length) return <MatchesTable competition={competition} data={matches}/>
    if (matches.length === 0) return <p>This competition has no listed matches.<br/><Button variant='contained' onClick={()=>path.goBack()}>Return</Button></p>
  }

  return(
    <section>
      <div id='content'>
        {renderMatches()}
      </div>
    </section>
  )
}

export default Matches