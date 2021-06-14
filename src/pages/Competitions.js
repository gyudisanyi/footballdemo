import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { fetchCompetitions, competitionsSelector } from '../slices/competitions'	

import CompetitionsTable from '../components/CompetitionsTable'


const Competitions = () => {
  
  const dispatch = useDispatch()	
  const { competitions, loading, hasErrors } = useSelector(competitionsSelector)	

  console.log('Competitions: ', competitions);		

  useEffect(() => {
    dispatch(fetchCompetitions())
  }, [dispatch])
  
  const renderCompetitions = () => {
    if (loading) return <p>Loading competitions...</p>
    if (hasErrors) return <p>Cannot display competitions...</p>
    return <CompetitionsTable data={competitions}/>
  }

  return (
    <section>
      <h1>Competitions</h1>
      <div className='content'>
        {renderCompetitions()}
      </div>
    </section>
  )
}

export default Competitions
