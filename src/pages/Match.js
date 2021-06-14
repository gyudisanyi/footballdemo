import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { matchesSelector } from '../slices/matches'

const headCells = [
  { id: 'utcDate', label: 'Date' },
  { id: 'homeTeam', label: 'Home team' },
  { id: 'awayTeam', label: 'Away team' },
  { id: 'homeScore', label: 'Home score' },
  { id: 'awayScore', label: 'Away score' },
  { id: 'status', label: 'Status' },
];


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


const Match = () => {

  const classes = useStyles();
  const matchId = useParams().matchId;
  const path = useHistory();
  const [match, setMatch] = useState({
    'homeTeam': null,
    'homeScore': null,
    'awayTeam': null,
    'awayScore': null,
    'winner': null,
    'status': null,
    'utcDate': null,
  });

  const { competition, matches } = useSelector(matchesSelector)

  useEffect(() => {
    const m = matches.filter(m => '' + m.id === '' + matchId)[0]
    const thisMatch = {};
    thisMatch.utcDate = m.utcDate.slice(0,10) + ' at ' + m.utcDate.slice(12,16);
    thisMatch.homeTeam = m.homeTeam.name;
    thisMatch.homeScore = m.score.fullTime.homeTeam;
    thisMatch.awayTeam = m.awayTeam.name;
    thisMatch.awayScore = m.score.fullTime.awayTeam;
    thisMatch.status = m.status;
    thisMatch.winner = m.score.winner;

    setMatch(thisMatch);
  }, [])

  return (
    <section>
      <div className={classes.root} id="content">
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            <Button onClick={()=>path.push('/')}>Competitions</Button> / <Button onClick={() => path.goBack()}>{competition}</Button> / <Button disabled style={{color: 'black'}}>{match.homeTeam}</Button> <Button disabled style={{color: 'black'}}>VS</Button> <Button disabled style={{color: 'black'}}>{match.awayTeam}</Button>
          </Typography>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="match table"
            >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}>
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {competition && (
                  <TableRow>
                    <TableCell>{match.utcDate}</TableCell>
                    <TableCell>{match.homeTeam}</TableCell>
                    <TableCell>{match.awayTeam}</TableCell>
                    <TableCell>{match.homeScore || '---'}</TableCell>
                    <TableCell>{match.awayScore || '---'}</TableCell>
                    <TableCell>{match.status}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </section>
  )
}

export default Match